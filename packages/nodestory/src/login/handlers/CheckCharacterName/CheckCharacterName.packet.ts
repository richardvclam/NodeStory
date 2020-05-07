import { PacketWriter } from '@nodestory/core';

import { LoginServerOpcode } from '../../constants/LoginServerOpcode';

export function nameAvailability(name: string, isAvailable: boolean) {
  const packet = new PacketWriter(LoginServerOpcode.CheckCharacterNameResult);
  packet.writeString(name);
  packet.writeByte(isAvailable ? 1 : 0);

  return packet;
}
