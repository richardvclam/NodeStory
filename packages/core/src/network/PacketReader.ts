export class PacketReader {
  private buffer: Buffer;
  private offset: number;

  constructor(data: Buffer) {
    this.buffer = Buffer.from(data);
    this.offset = 0;
  }

  public readByte(): number {
    const res = this.buffer.readInt8(this.offset);
    this.offset += 1;

    return res;
  }

  public readShort(): number {
    const res = this.buffer.readInt16LE(this.offset);
    this.offset += 2;

    return res;
  }

  public readInt(): number {
    const res = this.buffer.readInt32LE(this.offset);
    this.offset += 4;

    return res;
  }

  public readLong(): bigint {
    const res = this.buffer.readBigInt64LE(this.offset);
    this.offset += 8;

    return res;
  }

  public readUByte(): number {
    const res = this.buffer.readUInt8(this.offset);
    this.offset += 1;

    return res;
  }

  public readUShort(): number {
    const res = this.buffer.readUInt16LE(this.offset);
    this.offset += 2;

    return res;
  }

  public readUInt(): number {
    const res = this.buffer.readUInt32LE(this.offset);
    this.offset += 4;

    return res;
  }

  public readULong(): bigint {
    const res = this.buffer.readBigUInt64LE(this.offset);
    this.offset += 8;

    return res;
  }

  public readString(length?: number): string {
    let strLength = length || this.readUShort();
    let res = "";

    for (; strLength > 0; strLength--) {
      const byte = this.readUByte();

      if (byte === 0) {
        break;
      }

      res += String.fromCharCode(byte);
    }

    this.offset += strLength;

    return res;
  }

  public skip(length: number): void {
    this.offset += length;
  }

  public getBuffer(): Buffer {
    return this.buffer;
  }
}
