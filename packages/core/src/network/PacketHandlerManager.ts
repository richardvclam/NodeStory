import UnhandledHandler from '../handlers/UnhandledHandler';
import { Log } from '../utils/Log';
import { ClientPacketOpcode } from './ClientPacketOpcode';
import { IPacketHandler, PacketHandlerCallback } from './PacketHandler';

export class PacketHandlerManager {
  private handlers: PacketHandlerCallback[];

  constructor() {
    this.handlers = [];
  }

  public getHandler(opcode: ClientPacketOpcode): PacketHandlerCallback {
    if (typeof this.handlers[opcode!] !== "undefined") {
      return this.handlers[opcode!];
    }

    return UnhandledHandler.handler;
  }

  public assignHandler(packetHandler: IPacketHandler): void {
    for (let i = 0, len = packetHandler.opcodes.length; i < len; i++) {
      const opcode = packetHandler.opcodes[i];

      if (typeof this.handlers[opcode!] !== "undefined") {
        Log.warn(
          "Warning: Attempting to assign handler to an existing opcode.",
          packetHandler,
        );
      }

      this.handlers[opcode] = packetHandler.handler;
    }
  }
}
