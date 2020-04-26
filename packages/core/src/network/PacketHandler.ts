import { Client } from '../Client';
import { PacketReader } from './PacketReader';

export interface IPacketHandler {
  opcodes: number[];
  handler: PacketHandlerCallback;
}

export type PacketHandlerCallback = (
  client: Client,
  packet: PacketReader,
) => Promise<void>;
