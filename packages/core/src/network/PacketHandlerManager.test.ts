import UnhandledHandler from '../handlers/UnhandledHandler';
import { PacketHandler, PacketHandlerCallback } from './PacketHandler';
import { PacketHandlerManager } from './PacketHandlerManager';

class TestHandler extends PacketHandler {
  public static opcodes = [0x01];

  public static handlePacket: PacketHandlerCallback = async (
    client,
    packet,
  ) => {};
}

test("should create a packet manager, then assign and get a handler", () => {
  // Set up packet handler manager
  const packetHandlerManager = new PacketHandlerManager();

  // Assign test handler
  packetHandlerManager.assignHandler(TestHandler);

  const handler = packetHandlerManager.getHandler(0x01);

  expect(handler).toEqual(TestHandler.handlePacket);
});

test("should get UnhandledHandler with invalid opcode ", () => {
  // Set up packet handler manager
  const packetHandlerManager = new PacketHandlerManager();

  const handler = packetHandlerManager.getHandler(0x01);

  expect(handler).toEqual(UnhandledHandler.handlePacket);
});
