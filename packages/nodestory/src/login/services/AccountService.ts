import bcrypt from 'bcrypt';

import { Account, IAccountModel } from '../../../../core/src/models/Account';

const saltRounds = 10;

export async function findAccountByUsername(
  username: string,
): Promise<IAccountModel | null> {
  return Account.findOne({ username });
}

export async function createAccount(
  username: string,
  password: string,
): Promise<IAccountModel | null> {
  const hash = await bcrypt.hash(password, saltRounds);
  return Account.create({ username, password: hash });
}

export async function checkPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
