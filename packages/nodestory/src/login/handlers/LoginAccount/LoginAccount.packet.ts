import { PacketWriter } from '@nodestory/core';

import { IAccountModel } from '../../../../../core/src/models/Account';
import { LoginServerOpcode } from '../../constants/LoginServerOpcode';

export enum ELoginResult {
  Valid = 0,
  Banned = 3,
  InvalidPassword = 4,
  InvalidUsername = 5,
  LoggedIn = 7,
  EULA = 23,
}

export function loginSuccess(account: IAccountModel) {
  const writer = new PacketWriter(LoginServerOpcode.LoginResult);
  writer.writeUInt(ELoginResult.Valid);
  writer.writeUShort(0);
  writer.writeUInt(account._id);
  writer.writeUByte(0); // Gender
  writer.writeUByte(account.isAdmin ? 1 : 0); // Admin flag grade code
  writer.writeUByte(0); // Subgrade code
  writer.writeUByte(0); // County code
  writer.writeString(account.username);
  writer.writeUByte(0);
  writer.writeUByte(0); // Quiet ban reason
  writer.writeDate(new Date()); // Quiet ban lift date
  writer.writeDate(account.createdAt); // Creation date
  writer.writeUInt(0);

  // Pic info
  writer.writeUByte(1); // 0 = Pin-System Enabled, 1 = Disabled
  writer.writeUByte(2); // 0 = Register PIC, 1 = Ask for PIC, 2 = Disabled

  return writer;
}

export function loginFailed(result: ELoginResult) {
  const writer = new PacketWriter(LoginServerOpcode.LoginResult);
  writer.writeUInt(result);
  writer.writeUShort(0);

  return writer;
}
