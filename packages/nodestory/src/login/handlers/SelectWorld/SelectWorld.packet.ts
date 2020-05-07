import { ICharacterDocument } from 'core/src/models/Character';

import { PacketWriter } from '@nodestory/core';

import { serializeCharacter } from '../../../modules/Character/Character.packet';
import { LoginServerOpcode } from '../../constants/LoginServerOpcode';

export function selectWorld(
  worldId: number,
  channelId: number,
  characters: ICharacterDocument[],
): PacketWriter {
  const packet = new PacketWriter(LoginServerOpcode.SelectWorldResult);
  packet.writeUByte(0);

  // Characters
  packet.writeUByte(characters.length); // Character length
  characters.forEach((character) => {
    packet.append(serializeCharacter(character));
  });

  packet.writeUByte(2); // PIC options 0, 1, 2 - 2 is disabled
  packet.writeUInt(8); // Max characters

  return packet;
}

export function selectWorldError(): PacketWriter {
  const packet = new PacketWriter(LoginServerOpcode.SelectWorldResult);
  packet.writeUByte(8);

  return packet;
}
