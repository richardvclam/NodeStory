import { Socket } from 'net';

import { IAccountModel } from './models/Account';
import { PacketCrypto } from './network/PacketCrypto';
import { PacketReader } from './network/PacketReader';
import { PacketWriter } from './network/PacketWriter';
import { AESEncryption } from './security/AESEncryption';
import { Log } from './utils/Log';

export interface IClientInfo {
  version: number;
  subversion: string;
  locale: number;
}

export interface IClientCryptoConfig {
  aes: AESEncryption;
}

export class Client {
  private version: number;
  private subversion: string;
  private locale: number;

  private aes: AESEncryption;

  private localCrypto: PacketCrypto;
  private remoteCrypto: PacketCrypto;

  public account?: IAccountModel;
  public world?: number;
  public channel?: number;

  constructor(
    private readonly socket: Socket,
    info: IClientInfo,
    cryptoConfig: IClientCryptoConfig,
  ) {
    this.version = info.version;
    this.subversion = info.subversion;
    this.locale = info.locale;

    this.aes = cryptoConfig.aes;

    this.localCrypto = new PacketCrypto(this.version, this.aes);
    this.remoteCrypto = new PacketCrypto(this.version, this.aes);
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

    const data = this.localCrypto.decryptData(block);

    Log.log("debug", `[RECV] ${data.toString("hex")}\n${data.toString()}`);

    const reader = new PacketReader(data);

    return reader;
  }

  public sendPacket(packet: PacketWriter): void {
    const header = this.remoteCrypto.generateHeader(packet.getOffset());

    // this.socket.write(header);

    const data = packet.getBuffer();
    Log.log("debug", `[SEND] ${data.toString("hex")}\n${data.toString()}`);

    const encryptedData = this.remoteCrypto.encryptData(data);

    // this.socket.write(encryptedData);

    const payload = Buffer.concat([header, encryptedData]);
    this.socket.write(payload);
  }

  public sendHandshake(): void {
    const writer = new PacketWriter();
    writer.writeUShort(2 + 2 + this.subversion.length + 4 + 4 + 1);
    writer.writeUShort(this.version);
    writer.writeString(this.subversion);
    writer.writeBytes(this.localCrypto.getIV());
    writer.writeBytes(this.remoteCrypto.getIV());
    writer.writeUByte(this.locale);

    this.socket.write(writer.getBuffer());
  }
}
