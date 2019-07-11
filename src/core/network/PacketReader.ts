export class PacketReader {
  private buffer: Buffer;
  private offset: number;

  constructor(data: Buffer) {
    this.buffer = Buffer.from(data);
    this.offset = 0;
  }

  public readInt8(): number {
    const res = this.buffer.readInt8(this.offset);
    this.offset += 1;

    return res;
  }

  public readInt16(): number {
    const res = this.buffer.readInt16LE(this.offset);
    this.offset += 2;

    return res;
  }

  public readInt32(): number {
    const res = this.buffer.readInt32LE(this.offset);
    this.offset += 4;

    return res;
  }

  public readUInt8(): number {
    const res = this.buffer.readUInt8(this.offset);
    this.offset += 1;

    return res;
  }

  public readUInt16(): number {
    const res = this.buffer.readUInt16LE(this.offset);
    this.offset += 2;

    return res;
  }

  public readUInt32(): number {
    const res = this.buffer.readUInt32LE(this.offset);
    this.offset += 4;

    return res;
  }

  public readString(length?: number): string {
    let strLength = length || this.readUInt16();
    let res = "";

    for (; strLength > 0; strLength--) {
      const byte = this.readUInt8();

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
}
