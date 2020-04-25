import { PacketHandler, PacketHandlerCallback } from '../network/PacketHandler';
import { Log } from '../utils/Log';

export default class UnhandledHandler extends PacketHandler {
  public static opcodes = [];

  public static handlePacket: PacketHandlerCallback = async (
    client,
    packet,
  ) => {
    Log.warn(
      `Unhandled packet ${
        packet.getBuffer().toJSON().data
      } ${packet.getBuffer()}`,
    );
  };
}
