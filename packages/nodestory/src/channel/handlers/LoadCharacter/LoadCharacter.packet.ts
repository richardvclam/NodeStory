import { PacketWriter } from '@nodestory/core';
import { ICharacterDocument } from '@nodestory/core/src/models/Character';

import { serializeCharacterStats } from '../../../modules/Character/Character.packet';
import { ChannelServerOpcode } from '../../constants/ChannelServerOpcode';

export function loadCharacter(character: ICharacterDocument) {
  const packet = new PacketWriter(ChannelServerOpcode.LoadCharacterResponse);
  packet.writeUInt(0); // channel id
  packet.writeUByte(1); // portal count
  packet.writeUByte(1);
  packet.writeUShort(0);

  // RNGs
  packet.writeUInt(123123312);
  packet.writeUInt(234232);
  packet.writeUInt(123123132);

  packet.writeBytes(
    Uint8Array.from([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]),
  );
  packet.writeUByte(0);

  packet.append(serializeCharacterStats(character));

  packet.writeUByte(20); // Buddylist size
  packet.writeUByte(0); // Blessing of the Fairy name

  // inventory
  {
    packet.writeUInt(0); // mesos
    for (let i = 0; i < 5; i++) {
      packet.writeUByte(10); // maxslots
    }

    packet.writeULong(BigInt("1103806595072"));

    // Regular
    packet.writeUShort(0);

    // Cash
    packet.writeUShort(0);

    // Equip
    packet.writeUShort(0);

    // Evan
    packet.writeUShort(0);

    // Each inventory
    for (let i = 2; i <= 5; i++) {
      packet.writeUByte(0);
    }
  }

  // skills
  {
    packet.writeUShort(0); // skill length
    packet.writeUShort(0); // cooldowns
  }

  // quests
  {
    packet.writeUShort(0); // running
    packet.writeUShort(0); // finished
  }

  packet.writeUShort(0); // Crush Rings
  packet.writeUShort(0); // Friend Rings
  packet.writeUShort(0); // Marriage Rings
  packet.writeUShort(0);

  {
    // Teleport Rocks
    for (let i = 0; i < 5; i++) packet.writeUInt(999999999);

    for (let i = 0; i < 10; i++) packet.writeUInt(999999999);
  }

  {
    // Monsterbook
    packet.writeUInt(0); // Cover
    packet.writeUByte(0); // 'readmode'
    packet.writeUShort(0); // cards
  }

  packet.writeUShort(0);
  packet.writeUShort(0);
  packet.writeUShort(0);

  packet.writeDate(new Date()); // Current time

  return packet;
}
