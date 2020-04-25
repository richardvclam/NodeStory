import { Document, Model, model, Schema } from "mongoose";

export interface ICharacter {
  name: string;
  createdAt: Date;
}

export interface ICharacterModel extends ICharacter, Document {}

export const CharacterSchema = new Schema(
  {
    name: { type: String, required: true, index: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export const Character: Model<ICharacterModel> = model<ICharacterModel>(
  "Character",
  CharacterSchema,
);
