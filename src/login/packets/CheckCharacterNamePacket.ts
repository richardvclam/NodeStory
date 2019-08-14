import { PacketWriter } from "@core/network";
import { LoginServerOpcode } from "../constants/LoginServerOpcode";

export function nameAvailability(name: string, isAvailable: boolean) {
  const packet = new PacketWriter(LoginServerOpcode.CheckCharacterNameResult);
  packet.writeString(name);
  packet.writeByte(isAvailable ? 0 : 1);

  return packet;
}
