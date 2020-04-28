import crypto from 'crypto';

import { Character, ICharacter, ICharacterModel } from '../../../../core/src/models/Character';

export async function findCharacterByName(
  name: string,
): Promise<ICharacterModel | null> {
  return Character.findOne({ name });
}

export async function createCharacter(
  data: ICharacter,
): Promise<ICharacterModel | null> {
  const randomId = parseInt(crypto.randomBytes(4).toString("hex"), 16);
  return Character.create({ ...data, _id: randomId });
}

export async function getCharacters(
  accountId: string,
  worldId: number,
): Promise<ICharacterModel[]> {
  return Character.find({ _accountId: accountId, world: worldId });
}
