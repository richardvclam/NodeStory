import { Client } from "../Client";
import { ClientPacketOpcode } from "./ClientPacketOpcode";
import { PacketReader } from "./PacketReader";

export abstract class PacketHandler {
  public static readonly opcode: ClientPacketOpcode[] = [];
  public static readonly handlePacket: PacketHandlerCallback;
}

export type PacketHandlerCallback = (
  client: Client,
  packet: PacketReader,
) => void;
