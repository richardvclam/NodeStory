import { Character, ICharacter, ICharacterModel } from '../../../../core/src/models/Character';

export async function findCharacterByName(
  name: string,
): Promise<ICharacterModel | null> {
  return Character.findOne({ name });
}

export async function createCharacter(
  data: ICharacter,
): Promise<ICharacterModel | null> {
  return Character.create(data);
}

export async function getCharacters(
  accountId: string,
  worldId: number,
): Promise<ICharacterModel[]> {
  return Character.find({ _accountId: accountId, world: worldId });
}
