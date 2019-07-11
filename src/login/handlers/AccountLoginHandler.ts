import {
  PacketHandler,
  PacketHandlerCallback,
} from "../../core/network/PacketHandler";
import { PacketWriter } from "../../core/network/PacketWriter";
import { LoginClientOpcode } from "../constants/LoginClientOpcode";

export default class AccountLoginHandler extends PacketHandler {
  public opcode = LoginClientOpcode.AccountLogin;

  public handlePacket: PacketHandlerCallback = (client, packet) => {
    const username = packet.readString();
    const password = packet.readString();

    console.log({ username, password });

    const writer = new PacketWriter(0x0000);
    writer.writeUInt16(5);
    writer.writeUInt32(0);

    client.sendPacket(writer);
  };
}
