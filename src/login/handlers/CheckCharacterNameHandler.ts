import { PacketHandler, PacketHandlerCallback } from "@core/network";
import { LoginClientOpcode } from "../constants/LoginClientOpcode";
import { nameAvailability } from "../packets/CheckCharacterNamePacket";
import { findCharacterByName } from "../services/CharacterService";

export default class CheckCharacterNameHandler extends PacketHandler {
  public static opcodes = [LoginClientOpcode.CheckCharacterName];

  public static handlePacket: PacketHandlerCallback = async (
    client,
    packet,
  ) => {
    const name = packet.readString();

    const character = await findCharacterByName(name);
    const isAvailable = !character;

    return client.sendPacket(nameAvailability(name, isAvailable));
  };
}
