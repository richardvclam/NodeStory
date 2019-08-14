import fs from "fs";
import net from "net";
import path from "path";

import { Client } from "@core/Client";
import { PacketHandlerManager } from "@core/network";
import { Log } from "@core/utils/Log";

import loginServerConfig from "../config/loginserver.config.json";

export class LoginServer {
  private packetHandlerManager: PacketHandlerManager;
  private server: net.Server;

  constructor() {
    this.packetHandlerManager = new PacketHandlerManager();

    this.server = this.createServer();
  }

  public init() {
    Log.info(`Initializing login server.`);

    this.assignPacketHandlers();
  }

  public start() {
    const { port } = loginServerConfig;

    this.server.listen(port, () => {
      Log.info(`Login server is listening at port ${port}`);
    });
  }

  private createServer() {
    const server = net.createServer();

    server.on("connection", (socket) => {
      // console.log("socket", socket);
      Log.info("Client connected.");

      server.getConnections((error, count) => {
        Log.info(`Number of concurrent connections to the server: ${count}`);
      });

      const client = new Client(socket);

      console.log("Buffer size : " + socket.bufferSize);

      socket.on("data", async (packet) => {
        // Pausing socket to throttle the amount of data coming in
        socket.pause();

        const reader = client.readPacket(packet);

        if (reader) {
          try {
            const opcode = reader.readUShort();
            const handler = this.packetHandlerManager.getHandler(opcode);
            await handler(client, reader);
          } catch (err) {
            Log.error(err);
          }
        }

        socket.resume();
      });

      socket.on("end", () => {
        Log.info("Client ended.");
      });

      socket.on("close", () => {
        Log.info("Client closed.");
      });

      socket.on("error", (error) => {
        Log.info("Client errored.", error);
      });

      client.sendHandshake();
    });

    server.on("error", (err) => {
      Log.error(err);
    });

    return server;
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
