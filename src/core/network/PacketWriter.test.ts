import { PacketWriter } from "./PacketWriter";

test("packet without opcode should return empty buffer", () => {
  const packet = new PacketWriter();

  const expectedBuf: number[] = [];

  expect(packet.toByteArray()).toEqual(expectedBuf);
});

test("packet without opcode and write two bytes with value 14 should return [0x0E, 0x00]", () => {
  const packet = new PacketWriter();
  packet.writeUInt16(14);

  const expectedBuf = [0x0e, 0x00];

  expect(packet.toByteArray()).toEqual(expectedBuf);
});

test("packet without opcode and write four bytes with value 14 should return [0x0E, 0x00, 0x00, 0x00]", () => {
  const packet = new PacketWriter();
  packet.writeUInt32(14);

  const expectedBuf = [0x0e, 0x00, 0x00, 0x00];

  expect(packet.toByteArray()).toEqual(expectedBuf);
});

test("packet without opcode and write four bytes with value 1,458,854,438 should return [0x26, 0x5a, 0xf4, 0x56]", () => {
  const packet = new PacketWriter();
  packet.writeUInt32(1458854438);

  const expectedBuf = [0x26, 0x5a, 0xf4, 0x56];

  expect(packet.toByteArray()).toEqual(expectedBuf);
});

test("packet without opcode and write string 'hello' should return [0x05, 0x00, 0x68, 0x65, 0x6c, 0x6c, 0x6f]", () => {
  const packet = new PacketWriter();
  packet.writeString("hello");

  const expectedBuf = [0x05, 0x00, 0x68, 0x65, 0x6c, 0x6c, 0x6f];

  expect(packet.toByteArray()).toEqual(expectedBuf);
});
