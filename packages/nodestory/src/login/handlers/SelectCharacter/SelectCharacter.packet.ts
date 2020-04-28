import { PacketWriter, parseIPAddressToBytes } from '@nodestory/core';

import { LoginServerOpcode } from '../../constants/LoginServerOpcode';

export function enterChannel(
  ipAddress: string,
  port: number,
  characterId: number,
) {
  const packet = new PacketWriter(LoginServerOpcode.EnterChannel);
  packet.writeUShort(0);
  packet.writeBytes(parseIPAddressToBytes(ipAddress));
  packet.writeUShort(port);
  packet.writeUInt(characterId);
  packet.writeUByte(0);
  packet.writeUInt(0);

  return packet;
}
