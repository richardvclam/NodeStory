import { PacketHandler, PacketHandlerCallback } from "@core/network";
import { LoginClientOpcode } from "../constants/LoginClientOpcode";
import { selectWorld, selectWorldError } from "../packets/SelectWorldPacket";

export default class SelectWorldHandler extends PacketHandler {
  public static opcodes = [LoginClientOpcode.SelectWorld];

  public static handlePacket: PacketHandlerCallback = async (
    client,
    packet,
  ) => {
    const a = packet.readUByte();
    const worldId = packet.readUByte();
    const channelId = packet.readUByte();

    if (worldId === null || channelId < 0) {
      return client.sendPacket(selectWorldError());
    }

    return client.sendPacket(selectWorld(worldId, channelId));
  };
}
