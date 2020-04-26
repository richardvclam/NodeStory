import { IPacketHandler, PacketHandlerCallback } from './PacketHandler';

export function createPacketHandler(
  opcodes: number[] | number,
  handler: PacketHandlerCallback,
): IPacketHandler {
  return {
    opcodes: Array.isArray(opcodes) ? opcodes : [opcodes],
    handler,
  };
}
