import NotFoundHandler from "../handlers/NotFoundHandler";

import { ClientPacketOpcode } from "./ClientPacketOpcode";
import { PacketHandler, PacketHandlerCallback } from "./PacketHandler";

export class PacketHandlerManager {
  private handlers: PacketHandlerCallback[];

  constructor() {
    this.handlers = [];
  }

  public getHandler(opcode: ClientPacketOpcode): PacketHandlerCallback {
    if (typeof this.handlers[opcode!] !== "undefined") {
      return this.handlers[opcode!];
    }

    return NotFoundHandler.handlePacket;
  }

  public assignHandler(handler: PacketHandler): void {
    const Handler = handler as typeof PacketHandler;

    for (let i = 0, len = Handler.opcode.length; i < len; i++) {
      const opcode = Handler.opcode[i];

      if (typeof this.handlers[opcode!] !== "undefined") {
        console.warn(
          "Warning: Attempting to assign handler to an existing opcode.",
          { opcode, Handler },
        );
      }

      this.handlers[opcode!] = Handler.handlePacket;
    }
  }
}
