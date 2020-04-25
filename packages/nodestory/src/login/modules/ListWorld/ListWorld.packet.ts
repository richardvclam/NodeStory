import { PacketWriter } from '@nodestory/core';

import { LoginServerOpcode } from '../../constants/LoginServerOpcode';

export function worldInformation(world: any) {
  const writer = new PacketWriter(LoginServerOpcode.WorldInformation);
  writer.writeUByte(world.id);
  writer.writeString(world.name);
  writer.writeUByte(world.ribbon);
  writer.writeString(world.eventMessage);
  writer.writeUShort(100); // TODO: exp rate
  writer.writeUShort(100); // TODO: drop rate
  writer.writeUByte(world.disableCharacterCreation ? 1 : 0);

  // Channels
  writer.writeUByte(world.channels);
  for (let i = 1; i <= world.channels; i++) {
    writer.writeString(`${world.name}-${i}`);
    writer.writeUInt(10000); // TODO: Number of online players
    writer.writeUByte(world.id);
    writer.writeUByte(i - 1); // Channel id
    writer.writeUByte(0); // TODO: Adult channel
  }

  // TODO: Add login balloons. These are chat bubbles shown on the world select screen
  const dialogLength = world.dialogs.length;
  writer.writeUShort(dialogLength);
  for (let i = 0; i < dialogLength; i++) {
    const dialog = world.dialogs[i];
    writer.writeUShort(dialog.x);
    writer.writeUShort(dialog.y);
    writer.writeString(dialog.text);
  }

  return writer;
}

export function endWorldInformation() {
  const writer = new PacketWriter(LoginServerOpcode.WorldInformation);
  writer.writeUByte(0xff);

  return writer;
}
