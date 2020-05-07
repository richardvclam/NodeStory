import { Document, model, Schema, Types } from 'mongoose';

import { IAccountModel } from './Account';

export interface ICharacterDocument extends Document {
  _id: Number;
  _accountId: IAccountModel["_id"];
  name: string;
  gender: number;
  skin: number;
  face: number;
  hair: number;
  hairColor: number;
  stats: {
    level: number;
    job: number;
    str: number;
    dex: number;
    int: number;
    luk: number;
    hp: number;
    maxHp: number;
    mp: number;
    maxMp: number;
    ap: number;
    sp: number;
    exp: number;
    fame: number;
    gachaExp: number;
  };
  map: number;
  mapSpawn: number;
  rank?: number;
  rankMove?: number;
  jobRank?: number;
  jobRankMove?: number;
}

export const CharacterSchema = new Schema(
  {
    _id: Number,
    _accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    world: { type: Number, required: true },
    name: { type: String, required: true, unique: true },
    gender: { type: Number, required: true },
    skin: { type: Number, required: true },
    face: { type: Number, required: true },
    hair: { type: Number, required: true },
    hairColor: { type: Number, required: true },

    map: { type: Number, required: true },
    mapSpawn: { type: Number, required: true },

    stats: {
      level: { type: Number, required: true },
      job: { type: Number, required: true },
      str: { type: Number, required: true },
      dex: { type: Number, required: true },
      int: { type: Number, required: true },
      luk: { type: Number, required: true },
      hp: { type: Number, required: true },
      maxHp: { type: Number, required: true },
      mp: { type: Number, required: true },
      maxMp: { type: Number, required: true },
      ap: { type: Number, default: 0 },
      sp: { type: Number, default: 0 },
      exp: { type: Number, default: 0 },
      fame: { type: Number, default: 0 },
      gachaExp: { type: Number, default: 0 },
    },
  },
  {
    _id: false,
    timestamps: true,
  },
);

export const CharacterModel = model<ICharacterDocument>(
  "Character",
  CharacterSchema,
);
