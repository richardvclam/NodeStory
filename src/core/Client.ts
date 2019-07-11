import crypto from "crypto";
import { Socket } from "net";
import { encryptData, generateHeader, morphIV } from "./network/PacketCrypto";
import { PacketWriter } from "./network/PacketWriter";

import serverConfig from "../config/server.config.json";

export class Client {
  private socket: Socket;

  private localIV: Uint8Array;
  private remoteIV: Uint8Array;

  constructor(socket: Socket) {
    this.socket = socket;

    this.localIV = new Uint8Array(crypto.randomBytes(4));
    this.remoteIV = new Uint8Array(crypto.randomBytes(4));
  }

  public getLocalIV(): Uint8Array {
    return this.localIV;
  }

  public setLocalIV(iv: Uint8Array): void {
    this.localIV = iv;
  }

  public getRemoteIV(): Uint8Array {
    return this.remoteIV;
  }

  public setRemoteIV(iv: Uint8Array): void {
    this.remoteIV = iv;
  }

  public sendPacket(packet: PacketWriter): void {
    const header = Buffer.alloc(4);
    const { version } = serverConfig;

    generateHeader(header, this.remoteIV, packet.getOffset(), -(version + 1));

    this.socket.write(header);

    const buffer = packet.getBuffer();
    console.log("[SEND]", buffer);

    const data = encryptData(buffer, this.remoteIV);

    this.remoteIV = morphIV(this.remoteIV);

    this.socket.write(data);
  }
}
