import fs from 'fs';
import net from 'net';
import path from 'path';

import { Client, IClientInfo } from './Client';
import { PacketHandlerManager } from './network/PacketHandlerManager';
import { AESEncryption } from './security/AESEncryption';
import { Log } from './utils/Log';

export interface IServerCryptoConfig {
  aesKey: number[];
}

export class Server {
  private readonly packetHandlerManager: PacketHandlerManager;
  private readonly server: net.Server;
  private readonly aes: AESEncryption;

  constructor(
    private readonly port: number,
    private readonly clientConfig: IClientInfo,
    private readonly cryptoConfig: IServerCryptoConfig,
    private readonly modules: any,
  ) {
    this.packetHandlerManager = new PacketHandlerManager();
    this.aes = new AESEncryption(cryptoConfig.aesKey);

    this.server = this.createServer();
  }

  public init() {
    Log.info(`Initializing login server.`);

    this.assignPacketHandlers(this.modules);
  }

  public start() {
    this.server.listen(this.port, () => {
      Log.info(`Login server is listening at port ${this.port}`);
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

      const client = new Client(socket, this.clientConfig, { aes: this.aes });

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

  private assignPacketHandlers(modules: any) {
    modules.forEach(async (module: any) => {
      this.packetHandlerManager.assignHandler(module);
    });
  }

  // private assignPacketHandlers() {
  //   const handlersPath = path.join(__dirname, "/handlers");

  //   fs.readdirSync(handlersPath).forEach(async (handlerName) => {
  //     const handlerPath = path.join(handlersPath, handlerName);

  //     const Handler = await import(handlerPath);

  //     this.packetHandlerManager.assignHandler(Handler.default);
  //   });
  // }
}
