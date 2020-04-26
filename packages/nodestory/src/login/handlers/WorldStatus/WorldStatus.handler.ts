import { createPacketHandler, PacketHandlerCallback } from '@nodestory/core';

import { LoginClientOpcode } from '../../constants/LoginClientOpcode';
import { EWorldStatus, worldStatus } from './WorldStatus.packet';

export default createPacketHandler(
  [LoginClientOpcode.WorldStatus],
  async (client, packet) => {
    const worldId = packet.readUByte();

    return client.sendPacket(worldStatus(EWorldStatus.Normal));
  },
);
