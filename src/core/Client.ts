import crypto from "crypto";
import { Socket } from "net";
import {
  decryptData,
  encryptData,
  generateHeader,
  getPacketLength,
  morphIV,
} from "./network/PacketCrypto";
import { PacketWriter } from "./network/PacketWriter";

import serverConfig from "../config/server.config.json";
import { PacketReader } from "./network/PacketReader";

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
    const headerLength = 4;
    const header = packet.slice(0, headerLength);
    const packetLength = getPacketLength(header);

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

  public sendHandshake(): void {
    const { version, subversion, locale } = serverConfig;

    const writer = new PacketWriter();
    writer.writeUInt16(2 + 2 + subversion.length + 4 + 4 + 1);
    writer.writeUInt16(version);
    writer.writeString(subversion);
    writer.writeBytes(this.localIV);
    writer.writeBytes(this.remoteIV);
    writer.writeUInt8(locale);

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
