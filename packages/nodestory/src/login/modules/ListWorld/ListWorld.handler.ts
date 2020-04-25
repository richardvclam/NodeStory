import { PacketHandler, PacketHandlerCallback } from '@nodestory/core';

import loginServerConfig from '../../../config/loginserver.config.json';
import { LoginClientOpcode } from '../../constants/LoginClientOpcode';
import { endWorldInformation, worldInformation } from './ListWorld.packet';

export default class ListWorldHandler extends PacketHandler {
  public static opcodes = [
    LoginClientOpcode.ListWorld,
    LoginClientOpcode.RelistWorld,
  ];

  public static handlePacket: PacketHandlerCallback = async (
    client,
    packet,
  ) => {
    const { worlds } = loginServerConfig;

    worlds.forEach((world) => {
      client.sendPacket(worldInformation(world));
    });

    client.sendPacket(endWorldInformation());
  };
}
