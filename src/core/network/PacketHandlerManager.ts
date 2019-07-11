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

    return new NotFoundHandler().handlePacket;
  }

  public assignHandler(
    opcode: ClientPacketOpcode,
    handler: PacketHandlerCallback,
  ): void {
    if (typeof this.handlers[opcode!] !== "undefined") {
      console.warn(
        "Warning: Attempting to assign handler to an existing opcode.",
      );
    }

    this.handlers[opcode!] = handler;
  }
}
