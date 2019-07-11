import fs from "fs";

import net from "net";
import path from "path";

import { Client } from "../core/Client";
import { PacketHandlerManager } from "../core/network/PacketHandlerManager";

import loginServerConfig from "../config/loginserver.config.json";
import serverConfig from "../config/server.config.json";

export class LoginServer {
  private packetHandlerManager: PacketHandlerManager;

  constructor() {
    this.packetHandlerManager = new PacketHandlerManager();
  }

  public start() {
    console.log(`Initializing login server.`);

    const { version, subversion, locale } = serverConfig;
    const { port } = loginServerConfig;

    this.assignPacketHandlers();

    const server = net.createServer((socket) => {
      console.log("Client connected.");

      const client = new Client(socket);

      socket.on("data", (packet) => {
        socket.pause();

        const reader = client.readPacket(packet);

        if (reader) {
          const opcode = reader.readUInt16();
          const handler = this.packetHandlerManager.getHandler(opcode);

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

      client.sendHandshake();
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

      this.packetHandlerManager.assignHandler(Handler.default);
    });
  }
}
