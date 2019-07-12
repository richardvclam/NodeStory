import { Document, Schema, Model, model } from "mongoose";

export interface IAccount {
  username: string;
  password: string;
  isAdmin: boolean;
  isOnline: boolean;
  createdAt: Date;
}

export interface IAccountModel extends IAccount, Document {}

export const AccountSchema = new Schema(
  {
    username: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Account: Model<IAccountModel> = model<IAccountModel>(
  "Account",
  AccountSchema,
);
