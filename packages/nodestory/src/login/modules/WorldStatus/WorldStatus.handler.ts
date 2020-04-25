import { PacketHandler, PacketHandlerCallback } from '@nodestory/core';

import { LoginClientOpcode } from '../../constants/LoginClientOpcode';
import { EWorldStatus, worldStatus } from './WorldStatus.packet';

export default class WorldStatusHandler extends PacketHandler {
  public static opcodes = [LoginClientOpcode.WorldStatus];

  public static handlePacket: PacketHandlerCallback = async (
    client,
    packet,
  ) => {
    const worldId = packet.readUByte();

    return client.sendPacket(worldStatus(EWorldStatus.Normal));
  };
}
