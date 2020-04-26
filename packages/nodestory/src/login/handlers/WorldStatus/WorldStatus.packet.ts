import { PacketWriter } from '@nodestory/core';

import { LoginServerOpcode } from '../../constants/LoginServerOpcode';

export enum EWorldStatus {
  Normal,
  HighlyPopulated,
  Full,
}

export function worldStatus(status: EWorldStatus) {
  const packet = new PacketWriter(LoginServerOpcode.CheckUserLimitResult);
  packet.writeUShort(status);

  return packet;
}
