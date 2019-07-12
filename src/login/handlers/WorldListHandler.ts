import {
  PacketHandler,
  PacketHandlerCallback,
} from "../../core/network/PacketHandler";
import { LoginClientOpcode } from "../constants/LoginClientOpcode";

import loginServerConfig from "../../config/loginserver.config.json";
import {
  endWorldInformation,
  worldInformation,
} from "../packets/WorldListPacket";

export default class WorldListHandler extends PacketHandler {
  public static opcodes = [
    LoginClientOpcode.WorldList,
    LoginClientOpcode.WorldRelist,
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
