import { createPacketHandler } from '@nodestory/core';

import loginConfig from '../../../config/loginserver.config.json';
import { LoginClientOpcode } from '../../constants/LoginClientOpcode';
import { enterChannel } from './SelectCharacter.packet';

export default createPacketHandler(
  [LoginClientOpcode.SelectCharacter],
  async (client, packet) => {
    if (!client.account) {
      // TODO: handle disconnect
      return;
    }

    const characterId = packet.readUInt();
    const mac = packet.readString();
    const hwid = packet.readString();

    console.log("select character", {
      characterId,
      mac,
      hwid,
    });

    const world = loginConfig.worlds.find((world) => world.id === client.world);

    if (!world) {
      throw new Error("Looking for a world that does not exist.");
    }

    if (typeof client.channel === "undefined") {
      throw new Error("Attempting to enter world without selecting a channel");
    }

    const { publicIP, portStart } = world;

    console.log("public ip", publicIP);
    console.log("portStart", portStart);
    console.log("portStart + client.channel", portStart + client.channel);

    return client.sendPacket(
      enterChannel(publicIP, portStart + client.channel, characterId),
    );
  },
);
