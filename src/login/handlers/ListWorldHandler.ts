import { PacketHandler, PacketHandlerCallback } from "@core/network";
import { LoginClientOpcode } from "../constants/LoginClientOpcode";

import loginServerConfig from "../../config/loginserver.config.json";
import {
  endWorldInformation,
  worldInformation,
} from "../packets/ListWorldPacket";

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
