import { ServerPacketOpcode } from './ServerPacketOpcode';

export class PacketWriter {
  private buffer: Buffer;
  private offset: number;

  constructor(opcode?: ServerPacketOpcode) {
    this.buffer = Buffer.alloc(32);
    this.offset = 0;

    if (typeof opcode !== "undefined" && opcode !== null) {
      this.writeUShort(opcode);
    }
  }

  public writeByte(value: number): PacketWriter {
    this.realloc(1);
    this.buffer.writeInt8(value, this.offset);
    this.offset += 1;

    return this;
  }

  public writeShort(value: number): PacketWriter {
    this.realloc(2);
    this.buffer.writeInt16LE(value, this.offset);
    this.offset += 2;

    return this;
  }

  public writeInt(value: number): PacketWriter {
    this.realloc(4);
    this.buffer.writeInt32LE(value, this.offset);
    this.offset += 4;

    return this;
  }

  public writeLong(value: number | bigint): PacketWriter {
    this.realloc(8);
    this.buffer.writeBigInt64LE(
      typeof value === "bigint" ? value : BigInt(value),
      this.offset,
    );
    this.offset += 8;

    return this;
  }

  public writeUByte(value: number): PacketWriter {
    this.realloc(1);
    this.buffer.writeUInt8(value, this.offset);
    this.offset += 1;

    return this;
  }

  public writeUShort(value: number): PacketWriter {
    this.realloc(2);
    this.buffer.writeUInt16LE(value, this.offset);
    this.offset += 2;

    return this;
  }

  public writeUInt(value: number): PacketWriter {
    this.realloc(4);
    this.buffer.writeUInt32LE(value, this.offset);
    this.offset += 4;

    return this;
  }

  public writeULong(value: bigint): PacketWriter {
    this.realloc(8);
    this.buffer.writeBigUInt64LE(value, this.offset);
    this.offset += 8;

    return this;
  }

  public writeDate(date: Date): PacketWriter {
    this.writeULong(BigInt(date.getUTCMilliseconds()));

    return this;
  }

  public writeString(value: string, length?: number): PacketWriter {
    let str = "";

    if (typeof value !== "undefined" && value !== null) {
      str = value;
    }

    if (typeof length !== "undefined" && value !== null) {
      this.realloc(length);
      this.buffer.fill(0, this.offset, this.offset + length);
      this.buffer.write(value, this.offset, value.length);

      this.offset += length;
    } else {
      this.writeUShort(value.length);

      this.realloc(value.length);
      this.buffer.write(value, this.offset, value.length);

      this.offset += value.length;
    }

    return this;
  }

  public writeBytes(values: Uint8Array): PacketWriter {
    for (let i = 0, len = values.length; i < len; i++) {
      this.writeUByte(values[i]);
    }

    return this;
  }

  public append(packetWriter: PacketWriter): PacketWriter {
    // const newOffset = this.offset + packetWriter.offset;
    // this.buffer = Buffer.concat([this.buffer, packetWriter.buffer], newOffset);
    // this.offset = newOffset;

    this.writeBytes(packetWriter.getBuffer());

    return this;
  }

  public getBuffer(): Buffer {
    const buffer = Buffer.alloc(this.offset);
    this.buffer.copy(buffer);

    return buffer;
  }

  public getOffset(): number {
    return this.offset;
  }

  public toByteArray(): number[] {
    return this.getBuffer().toJSON().data;
  }

  private realloc(size: number): void {
    if (this.offset + size > this.buffer.length) {
      const oldBuffer = this.buffer;
      let newSize = this.buffer.length;

      while (newSize < this.offset + size) {
        newSize *= 2;
      }

      this.buffer = Buffer.alloc(~~newSize);
      oldBuffer.copy(this.buffer);
    }
  }
}
