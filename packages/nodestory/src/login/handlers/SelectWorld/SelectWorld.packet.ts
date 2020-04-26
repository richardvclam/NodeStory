import { PacketWriter } from '@nodestory/core';

import { LoginServerOpcode } from '../../constants/LoginServerOpcode';

export function selectWorld(worldId: number, channelId: number): PacketWriter {
  const packet = new PacketWriter(LoginServerOpcode.SelectWorldResult);
  packet.writeUByte(0);

  // Characters
  packet.writeUByte(0); // Character length

  // character loop

  packet.writeUByte(1); // PIC registered
  packet.writeUInt(6); // Max characters

  return packet;
}

export function selectWorldError(): PacketWriter {
  const packet = new PacketWriter(LoginServerOpcode.SelectWorldResult);
  packet.writeUByte(8);

  return packet;
}
