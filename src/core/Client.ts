import crypto from "crypto";
import { Socket } from "net";
import {
  decryptData,
  encryptData,
  generateHeader,
  morphIV,
} from "./network/PacketCrypto";
import { PacketReader } from "./network/PacketReader";
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

  public readPacket(packet: Buffer): PacketReader | null {
    if (packet.length === 0) {
      return null;
    }

    const headerLength = 4;
    const packetLength = packet.length - headerLength;

    if (packetLength === 0) {
      return null;
    }

    const block = packet.slice(headerLength);

    const data = decryptData(block, this.localIV);
    this.localIV = morphIV(this.localIV);

    console.log(`[RECV]`, data);

    const reader = new PacketReader(data);

    return reader;
  }

  public sendPacket(packet: PacketWriter): void {
    const { version } = serverConfig;

    const header = generateHeader(this.remoteIV, packet.getOffset(), version);

    this.socket.write(header);

    const buffer = packet.getBuffer();
    console.log("[SEND]", buffer);

    const data = encryptData(buffer, this.remoteIV);
    this.remoteIV = morphIV(this.remoteIV);

    this.socket.write(data);
  }

  public sendHandshake(): void {
    const { version, subversion, locale } = serverConfig;

    const writer = new PacketWriter();
    writer.writeUShort(2 + 2 + subversion.length + 4 + 4 + 1);
    writer.writeUShort(version);
    writer.writeString(subversion);
    writer.writeBytes(this.localIV);
    writer.writeBytes(this.remoteIV);
    writer.writeUByte(locale);

    this.socket.write(writer.getBuffer());
  }

  private getLocalIV(): Uint8Array {
    return this.localIV;
  }

  private setLocalIV(iv: Uint8Array): void {
    this.localIV = iv;
  }

  private getRemoteIV(): Uint8Array {
    return this.remoteIV;
  }

  private setRemoteIV(iv: Uint8Array): void {
    this.remoteIV = iv;
  }
}
