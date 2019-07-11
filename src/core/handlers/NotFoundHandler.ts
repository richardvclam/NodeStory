import { ClientPacketOpcode } from "../network/ClientPacketOpcode";
import { PacketHandler, PacketHandlerCallback } from "../network/PacketHandler";

export default class NotFoundHandler extends PacketHandler {
  public opcode: ClientPacketOpcode = null;

  public handlePacket: PacketHandlerCallback = (client, packet) => {
    console.log("Unhandled packet", packet);
  };
}
