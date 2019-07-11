import fs from "fs";
import net from "net";
import path from "path";

import { Client } from "../core/Client";

import {
  decryptData,
  getPacketLength,
  morphIV,
} from "../core/network/PacketCrypto";
import { PacketHandler } from "../core/network/PacketHandler";
import { PacketHandlerManager } from "../core/network/PacketHandlerManager";
import { PacketReader } from "../core/network/PacketReader";
import { PacketWriter } from "../core/network/PacketWriter";

import loginServerConfig from "../config/loginserver.config.json";
import serverConfig from "../config/server.config.json";

export class LoginServer {
  private packetHandlerManager: PacketHandlerManager;

  constructor() {
    this.packetHandlerManager = new PacketHandlerManager();

    this.assignPacketHandlers();
  }

  public start() {
    console.log(`Initializing login server.`);

    const { version, subversion, locale } = serverConfig;
    const { port } = loginServerConfig;

    const server = net.createServer((socket) => {
      console.log("Client connected.");

      const client = new Client(socket);

      const headerLength = 4;
      let ponged = true;

      socket.on("data", (receivedData) => {
        socket.pause();

        const header = receivedData.slice(0, headerLength);
        const packetLength = getPacketLength(header);

        if (packetLength > 0) {
          const block = receivedData.slice(headerLength);

          const data = decryptData(block, client.getLocalIV());
          client.setLocalIV(morphIV(client.getLocalIV()));

          const reader = new PacketReader(data);
          const opcode = reader.readUInt16();

          const handler = this.packetHandlerManager.getHandler(opcode);

          console.log(`[RECV]`, data);
          try {
            handler(client, reader);
          } catch (err) {
            console.error(err);
          }
        }

        socket.resume();
      });

      socket.on("end", () => {
        console.log("Client ended.");
      });

      socket.on("close", () => {
        console.log("Client closed.");
      });

      socket.on("error", (error) => {
        console.log("Client errored.", error);
      });

      // Send handshake
      const packet = new PacketWriter();
      packet.writeUInt16(2 + 2 + subversion.length + 4 + 4 + 1);
      packet.writeUInt16(version);
      packet.writeString(subversion);
      packet.writeBytes(client.getLocalIV());
      packet.writeBytes(client.getRemoteIV());
      packet.writeUInt8(locale);

      socket.write(packet.getBuffer());
    });

    server.listen(port, () => {
      console.log(`Login server is listening at port ${port}`);
    });
  }

  private assignPacketHandlers() {
    const handlersPath = path.join(__dirname, "/handlers");

    fs.readdirSync(handlersPath).forEach(async (handlerName) => {
      const handlerPath = path.join(handlersPath, handlerName);

      const Handler = await import(handlerPath);

      const handler: PacketHandler = new Handler.default();

      this.packetHandlerManager.assignHandler(
        handler.opcode,
        handler.handlePacket,
      );
    });
  }
}
