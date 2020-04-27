import { ICharacterModel } from 'core/src/models/Character';

import { PacketWriter } from '@nodestory/core';

import { serializeCharacter } from '../../../modules/Character/Character.packet';
import { LoginServerOpcode } from '../../constants/LoginServerOpcode';

export function createCharacterSuccess(character: ICharacterModel) {
  const packet = new PacketWriter(LoginServerOpcode.CreateCharacterResult);
  packet.writeByte(0);
  packet.append(serializeCharacter(character));

  return packet;
}
