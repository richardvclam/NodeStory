import { PacketWriter } from '@nodestory/core';

export function handshake({
  version,
  subversion,
  locale,
  localIV,
  remoteIV,
}: {
  version: number;
  subversion: string;
  locale: number;
  localIV: Uint8Array;
  remoteIV: Uint8Array;
}) {
  const packet = new PacketWriter();
  packet.writeUShort(2 + 2 + subversion.length + 4 + 4 + 1);
  packet.writeUShort(version);
  packet.writeString(subversion);
  packet.writeBytes(localIV);
  packet.writeBytes(remoteIV);
  packet.writeUByte(locale);

  return packet;
}
