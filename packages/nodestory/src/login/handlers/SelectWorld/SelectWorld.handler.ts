import { Character } from 'nodestory/src/modules/Character/Character';

import { createPacketHandler } from '@nodestory/core';

import { LoginClientOpcode } from '../../constants/LoginClientOpcode';
import { getCharacters } from '../../services/CharacterService';
import { selectWorld, selectWorldError } from './SelectWorld.packet';

export default createPacketHandler(
  [LoginClientOpcode.SelectWorld],
  async (client, packet) => {
    const a = packet.readUByte();
    const world = packet.readUByte();
    const channel = packet.readUByte();

    // if (world === null || channel < 0) {
    //   return client.sendPacket(selectWorldError());
    // }

    client.world = world;
    client.channel = channel;

    const characters = await getCharacters(client.account?._id, world);

    return client.sendPacket(selectWorld(world, channel, characters));
  },
);
