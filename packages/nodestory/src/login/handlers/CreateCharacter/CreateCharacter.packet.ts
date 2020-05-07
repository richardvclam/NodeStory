import { PacketWriter } from '@nodestory/core';
import { ICharacterDocument } from '@nodestory/core/src/models/Character';

import { serializeCharacter } from '../../../modules/Character/Character.packet';
import { LoginServerOpcode } from '../../constants/LoginServerOpcode';

export function createCharacterSuccess(character: ICharacterDocument) {
  const packet = new PacketWriter(LoginServerOpcode.CreateCharacterResult);
  packet.writeByte(0);
  packet.append(serializeCharacter(character));

  return packet;
}
