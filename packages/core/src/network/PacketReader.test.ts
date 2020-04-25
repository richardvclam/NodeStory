import { PacketReader } from "./PacketReader";

const failedLoginResponse = [
  0x01,
  0x00,
  0x04,
  0x00,
  0x74,
  0x65,
  0x73,
  0x74,
  0x08,
  0x00,
  0x70,
  0x61,
  0x73,
  0x73,
  0x77,
  0x6f,
  0x72,
  0x64,
  0x00,
  0x00,
  0x00,
  0x00,
  0x00,
  0x00,
  0xa9,
  0x62,
  0x95,
  0x9a,
];

test("should read packet and return opcode 0x01", () => {
  const reader = new PacketReader(Buffer.from([0x01, 0x00]));

  const opcode = reader.readUShort();

  expect(opcode).toBe(1);
});

test("read packet should return opcode, username, and password", () => {
  const reader = new PacketReader(Buffer.from(failedLoginResponse));

  const opcode = reader.readUShort();
  const username = reader.readString();

  expect(username).toBe("test");
});
