import { generateId } from '@nodestory/core';
import {
    CharacterModel, ICharacter, ICharacterDocument
} from '@nodestory/core/src/models/Character';

export async function findCharacterByName(
  name: string,
): Promise<ICharacterDocument | null> {
  return CharacterModel.findOne({ name });
}

export async function createCharacter(
  data: ICharacter,
): Promise<ICharacterDocument | null> {
  const randomId = generateId();
  return CharacterModel.create({ ...data, _id: randomId });
}

export async function getCharacters(
  accountId: string,
  worldId: number,
): Promise<ICharacterDocument[]> {
  return CharacterModel.find({ _accountId: accountId, world: worldId });
}
