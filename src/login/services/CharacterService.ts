import { Character, ICharacterModel } from "../../models/Character";

export async function findCharacterByName(
  name: string,
): Promise<ICharacterModel | null> {
  return Character.findOne({ name });
}

export async function createCharacter(
  name: string,
): Promise<ICharacterModel | null> {
  return Character.create({ name });
}
