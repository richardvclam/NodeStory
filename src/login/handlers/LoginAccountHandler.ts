import { PacketHandler, PacketHandlerCallback } from "@core/network";
import { Log } from "@core/utils/Log";

import { LoginClientOpcode } from "../constants/LoginClientOpcode";
import {
  ELoginResult,
  loginFailed,
  loginSuccess,
} from "../packets/LoginAccountPacket";

import {
  checkPassword,
  createAccount,
  findAccountByUsername,
} from "../services/AccountService";

import loginServerConfig from "../../config/loginserver.config.json";

export default class LoginAccountHandler extends PacketHandler {
  public static opcodes = [LoginClientOpcode.LoginAccount];

  public static handlePacket: PacketHandlerCallback = async (
    client,
    packet,
  ) => {
    const username = packet.readString();
    const password = packet.readString();

    let account;
    try {
      account = await findAccountByUsername(username);
    } catch (err) {
      Log.error(err);
    }

    // Account was not found
    if (!account) {
      // If auto register is enabled, automatically create account for them
      // Otherwise return invalid password
      // We do not want to expose that it is a valid username even when it's not.
      if (loginServerConfig.enableAutoRegister) {
        // Attempt to create a new account
        try {
          account = await createAccount(username, password);
        } catch (err) {
          Log.error(err);
        }
      }
    }

    // Earlier we attempted to create a user account.
    // If there is still no account at this point, return invalid password.
    if (!account) {
      return client.sendPacket(loginFailed(ELoginResult.InvalidPassword));
    }

    // Check plaintext password against hashed password
    const isPasswordValid = await checkPassword(password, account.password);
    if (!isPasswordValid) {
      return client.sendPacket(loginFailed(ELoginResult.InvalidPassword));
    }

    // Account is already logged in
    if (account.isOnline) {
      return client.sendPacket(loginFailed(ELoginResult.LoggedIn));
    }

    // Account looks to be good to login!
    Log.info(`User logged in: ${account.username}`);
    return client.sendPacket(loginSuccess(account));
  };
}