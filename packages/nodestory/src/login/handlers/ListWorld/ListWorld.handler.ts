import { createPacketHandler } from '@nodestory/core';

import loginServerConfig from '../../../config/loginserver.config.json';
import { LoginClientOpcode } from '../../constants/LoginClientOpcode';
import { endWorldInformation, worldInformation } from './ListWorld.packet';

export default createPacketHandler(
  [LoginClientOpcode.ListWorld, LoginClientOpcode.RelistWorld],
  async (client, packet) => {
    const { worlds } = loginServerConfig;

    worlds.forEach((world) => {
      client.sendPacket(worldInformation(world));
    });

    client.sendPacket(endWorldInformation());
  },
);
