export enum LoginServerOpcode {
  LoginResult = 0,
  CheckUserLimitResult = 3,
  WorldInformation = 10,
  SelectWorldResult = 11,
  CheckCharacterNameResult = 13,
  CreateCharacterResult = 14,
  DeleteCharacterResult = 15,
  EnterChannel = 0x0c,
}
