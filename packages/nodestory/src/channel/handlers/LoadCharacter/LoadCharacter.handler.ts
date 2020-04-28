import { createPacketHandler } from '@nodestory/core';
import { Character } from '@nodestory/core/src/models/Character';

import { ChannelClientOpcode } from '../../constants/ChannelClientOpcode';
import { loadCharacter } from './LoadCharacter.packet';

export default createPacketHandler(
  [ChannelClientOpcode.LoadCharacter],
  async (client, packet) => {
    const characterId = packet.readUInt();

    const character = await Character.findById(characterId);

    if (!character) {
      throw new Error("Could not find character");
    }

    return client.sendPacket(loadCharacter(character));
  },
);
