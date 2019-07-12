import {
  PacketHandler,
  PacketHandlerCallback,
} from "../../core/network/PacketHandler";
import { LoginClientOpcode } from "../constants/LoginClientOpcode";

export default class WorldSelectHandler extends PacketHandler {
  public static opcodes = [LoginClientOpcode.WorldSelect];

  public static handlePacket: PacketHandlerCallback = async (
    client,
    packet,
  ) => {};
}
