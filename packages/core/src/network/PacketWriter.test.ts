import { PacketWriter } from './PacketWriter';

describe("PacketWriter", () => {
  it("packet without opcode should return empty buffer", () => {
    const packet = new PacketWriter();

    const expectedBuf: number[] = [];

    expect(packet.toByteArray()).toEqual(expectedBuf);
  });

  it("packet without opcode and write two bytes with value 14 should return [0x0E, 0x00]", () => {
    const packet = new PacketWriter();
    packet.writeUShort(14);

    const expectedBuf = [0x0e, 0x00];

    expect(packet.toByteArray()).toEqual(expectedBuf);
  });

  it("packet without opcode and write four bytes with value 14 should return [0x0E, 0x00, 0x00, 0x00]", () => {
    const packet = new PacketWriter();
    packet.writeUInt(14);

    const expectedBuf = [0x0e, 0x00, 0x00, 0x00];

    expect(packet.toByteArray()).toEqual(expectedBuf);
  });

  it("packet without opcode and write four bytes with value 1,458,854,438 should return [0x26, 0x5a, 0xf4, 0x56]", () => {
    const packet = new PacketWriter();
    packet.writeUInt(1458854438);

    const expectedBuf = [0x26, 0x5a, 0xf4, 0x56];

    expect(packet.toByteArray()).toEqual(expectedBuf);
  });

  it("packet without opcode and write string 'hello' should return [0x05, 0x00, 0x68, 0x65, 0x6c, 0x6c, 0x6f]", () => {
    const packet = new PacketWriter();
    packet.writeString("hello");

    const expectedBuf = [0x05, 0x00, 0x68, 0x65, 0x6c, 0x6c, 0x6f];

    expect(packet.toByteArray()).toEqual(expectedBuf);
  });

  it("multiple packets appended should return correctly", () => {
    const packet = new PacketWriter();
    packet.writeUInt(1458854438);

    console.log("before", packet);

    const packet2 = new PacketWriter();
    packet2.writeUInt(1458854438);

    const packet3 = new PacketWriter();
    packet2.writeUInt(1458854438);

    packet.append(packet2);
    packet.append(packet3);

    const expectedBuf = [
      0x26,
      0x5a,
      0xf4,
      0x56,
      0x26,
      0x5a,
      0xf4,
      0x56,
      0x26,
      0x5a,
      0xf4,
      0x56,
    ];

    console.log("after", packet);

    expect(packet.toByteArray()).toEqual(expectedBuf);
  });
});
