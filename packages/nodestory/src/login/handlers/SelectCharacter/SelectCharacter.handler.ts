import { createPacketHandler } from '@nodestory/core';

import loginConfig from '../../../config/loginserver.config.json';
import { LoginClientOpcode } from '../../constants/LoginClientOpcode';
import { enterChannel } from './SelectCharacter.packet';

export default createPacketHandler(
  LoginClientOpcode.SelectCharacter,
  async (client, packet) => {
    if (!client.account) {
      // TODO: handle disconnect
      return;
    }

    const characterId = packet.readUInt();
    const mac = packet.readString();
    const hwid = packet.readString();

    const world = loginConfig.worlds.find((world) => world.id === client.world);

    if (!world) {
      throw new Error("Looking for a world that does not exist.");
    }

    if (typeof client.channel === "undefined") {
      throw new Error("Attempting to enter world without selecting a channel");
    }

    const { publicIP, portStart } = world;

    return client.sendPacket(
      enterChannel(publicIP, portStart + client.channel, characterId),
    );
  },
);
