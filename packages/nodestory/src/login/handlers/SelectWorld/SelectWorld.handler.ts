import { createPacketHandler } from '@nodestory/core';

import { LoginClientOpcode } from '../../constants/LoginClientOpcode';
import { selectWorld, selectWorldError } from './SelectWorld.packet';

export default createPacketHandler(
  [LoginClientOpcode.SelectWorld],
  async (client, packet) => {
    const a = packet.readUByte();
    const worldId = packet.readUByte();
    const channelId = packet.readUByte();

    if (worldId === null || channelId < 0) {
      return client.sendPacket(selectWorldError());
    }

    return client.sendPacket(selectWorld(worldId, channelId));
  },
);
