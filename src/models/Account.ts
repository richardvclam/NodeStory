import { Document, Schema, Model, model } from "mongoose";

export interface IAccount {
  username: string;
  password: string;
  createdAt: Date;
}

export interface IAccountModel extends IAccount, Document {}

export const AccountSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  },
);

export const Account: Model<IAccountModel> = model<IAccountModel>(
  "Account",
  AccountSchema,
);
