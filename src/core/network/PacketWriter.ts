export class PacketWriter {
  private buffer: Buffer;
  private offset: number;

  constructor(opcode?: number) {
    this.buffer = Buffer.alloc(32);
    this.offset = 0;

    if (typeof opcode !== "undefined" && opcode !== null) {
      this.writeUInt16(opcode!);
    }
  }

  public writeInt8(value: number): PacketWriter {
    this.realloc(1);
    this.buffer.writeInt8(value, this.offset);
    this.offset += 1;

    return this;
  }

  public writeInt16(value: number): PacketWriter {
    this.realloc(2);
    this.buffer.writeInt16LE(value, this.offset);
    this.offset += 2;

    return this;
  }

  public writeInt32(value: number): PacketWriter {
    this.realloc(4);
    this.buffer.writeInt32LE(value, this.offset);
    this.offset += 4;

    return this;
  }

  public writeUInt8(value: number): PacketWriter {
    this.realloc(1);
    this.buffer.writeUInt8(value, this.offset);
    this.offset += 1;

    return this;
  }

  public writeUInt16(value: number): PacketWriter {
    this.realloc(2);
    this.buffer.writeUInt16LE(value, this.offset);
    this.offset += 2;

    return this;
  }

  public writeUInt32(value: number): PacketWriter {
    this.realloc(4);
    this.buffer.writeUInt32LE(value, this.offset);
    this.offset += 4;

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
      this.writeUInt16(value.length);

      this.realloc(value.length);
      this.buffer.write(value, this.offset, value.length);

      this.offset += value.length;
    }

    return this;
  }

  public writeBytes(values: Uint8Array): PacketWriter {
    for (let i = 0, len = values.length; i < len; i++) {
      this.writeUInt8(values[i]);
    }

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
