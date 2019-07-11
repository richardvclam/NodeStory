import { PacketWriter } from "../../core/network/PacketWriter";
import { LoginServerOpcode } from "../constants/LoginServerOpcode";
import { IAccountModel } from "../../models/Account";

export enum LoginResult {
  Valid = 0,
  Banned = 3,
  InvalidPassword = 4,
  InvalidUsername = 5,
  LoggedIn = 7,
  EULA = 23,
}

export function loginSuccess(account: IAccountModel) {
  const writer = new PacketWriter(LoginServerOpcode.LoginResult);
  writer.writeUInt32(LoginResult.Valid);
  writer.writeUInt16(0);
  writer.writeUInt32(account._id);
  writer.writeUInt8(0);
  writer.writeUInt8(0); // Admin flag
  writer.writeUInt8(0);
  writer.writeUInt8(0);
  writer.writeString(account.username);
  writer.writeUInt8(0);
  writer.writeUInt8(0); // Mute reason
  writer.writeDate(new Date()); // Mute reset date
  writer.writeDate(account.createdAt); // Creation date
  writer.writeUInt32(0);

  // Pic info
  writer.writeUInt8(1); // true
  writer.writeUInt8(1);

  return writer;
}

export function loginFailed(result: LoginResult) {
  const writer = new PacketWriter(LoginServerOpcode.LoginResult);
  writer.writeUInt32(result);
  writer.writeUInt16(0);

  return writer;
}
