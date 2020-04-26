import { createPacketHandler } from '../network/PacketHandlerFactory';
import { Log } from '../utils/Log';

export default createPacketHandler([], async (client, packet) => {
  Log.warn(
    `Unhandled packet ${
      packet.getBuffer().toJSON().data
    } ${packet.getBuffer()}`,
  );
});
