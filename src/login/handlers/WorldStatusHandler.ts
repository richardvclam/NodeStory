import { PacketHandler, PacketHandlerCallback } from "@core/network";
import { LoginClientOpcode } from "../constants/LoginClientOpcode";
import { EWorldStatus, worldStatus } from "../packets/WorldStatusPacket";

export default class WorldStatusHandler extends PacketHandler {
  public static opcodes = [LoginClientOpcode.WorldStatus];

  public static handlePacket: PacketHandlerCallback = async (
    client,
    packet,
  ) => {
    const worldId = packet.readUByte();

    return client.sendPacket(worldStatus(EWorldStatus.Normal));
  };
}
