import { Client } from "../Client";
import { ClientPacketOpcode } from "./ClientPacketOpcode";
import { PacketReader } from "./PacketReader";

export abstract class PacketHandler {
  public abstract readonly opcode: ClientPacketOpcode;
  public abstract handlePacket: PacketHandlerCallback;
}

export type PacketHandlerCallback = (
  client: Client,
  packet: PacketReader,
) => void;
