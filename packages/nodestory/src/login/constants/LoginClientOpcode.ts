export enum LoginClientOpcode {
  LoginAccount = 0x01,
  RelistWorld = 0x04,
  SelectWorld = 0x05,
  WorldStatus = 0x06,
  ListWorld = 0x0b,
  SelectCharacter = 0x13,
  CheckCharacterName = 0x15,
  CreateCharacter = 0x16,
  DeleteCharacter = 0x17,
  RegisterPIC = 0x1d,
  SelectCharacterPIC = 0x1e,
}
