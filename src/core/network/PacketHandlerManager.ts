import UnhandledHandler from "../handlers/UnhandledHandler";

import { ClientPacketOpcode } from "./ClientPacketOpcode";
import { PacketHandler, PacketHandlerCallback } from "./PacketHandler";
import { Log } from "@core/utils/Log";

export class PacketHandlerManager {
  private handlers: PacketHandlerCallback[];

  constructor() {
    this.handlers = [];
  }

  public getHandler(opcode: ClientPacketOpcode): PacketHandlerCallback {
    if (typeof this.handlers[opcode!] !== "undefined") {
      return this.handlers[opcode!];
    }

    return UnhandledHandler.handlePacket;
  }

  public assignHandler(handler: PacketHandler): void {
    const Handler = handler as typeof PacketHandler;

    for (let i = 0, len = Handler.opcodes.length; i < len; i++) {
      const opcode = Handler.opcodes[i];

      if (typeof this.handlers[opcode!] !== "undefined") {
        Log.warn(
          "Warning: Attempting to assign handler to an existing opcode.",
          { opcode, Handler },
        );
      }

      this.handlers[opcode!] = Handler.handlePacket;
    }
  }
}
