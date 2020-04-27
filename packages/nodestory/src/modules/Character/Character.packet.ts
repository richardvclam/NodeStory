import { ICharacterModel } from 'core/src/models/Character';

import { PacketWriter } from '@nodestory/core';

export function serializeCharacter(character: ICharacterModel): PacketWriter {
  const packet = new PacketWriter();

  packet.append(serializeCharacterStats(character));
  packet.append(serializeCharacterAppearance(character));

  packet.writeByte(0); // TODO: viewall

  // TODO: isGM

  packet.writeByte(0); // disables the next 4 lines
  // packet.writeInt(character.rank);
  // packet.writeInt(character.rankMove);
  // packet.writeInt(character.jobRank);
  // packet.writeInt(character.jobRankMove);

  return packet;
}

export function serializeCharacterStats(character: ICharacterModel) {
  const packet = new PacketWriter();

  packet.writeUInt(parseInt(String(character._id).substr(0, 8), 16));
  packet.writeString(character.name, 13);
  packet.writeByte(character.gender);
  packet.writeByte(character.skin);
  packet.writeInt(character.face);
  packet.writeInt(character.hair);
  // TODO: Pets
  packet.writeLong(0); // pet 1
  packet.writeLong(0); // pet 2
  packet.writeLong(0); // pet 3
  packet.writeUByte(character.stats.level);
  packet.writeUShort(character.stats.job);
  packet.writeUShort(character.stats.str);
  packet.writeUShort(character.stats.dex);
  packet.writeUShort(character.stats.int);
  packet.writeUShort(character.stats.luk);
  packet.writeUShort(character.stats.hp);
  packet.writeUShort(character.stats.maxHp);
  packet.writeUShort(character.stats.mp);
  packet.writeUShort(character.stats.maxMp);
  packet.writeUShort(character.stats.ap);
  packet.writeUShort(character.stats.sp);
  packet.writeUInt(character.stats.exp);
  packet.writeUShort(character.stats.fame);
  packet.writeUInt(character.stats.gachaExp);
  packet.writeUInt(character.map);
  packet.writeUByte(character.mapSpawn);
  packet.writeInt(0);

  return packet;
}

export function serializeCharacterAppearance(
  character: ICharacterModel,
  isMegaphone: boolean = false,
): PacketWriter {
  const packet = new PacketWriter();
  packet.writeUByte(character.gender);
  packet.writeUByte(character.skin);
  packet.writeUInt(character.face);
  packet.writeByte(isMegaphone ? 1 : 0); // mega
  packet.writeUInt(character.hair);

  const equips = [1040010, 1062056, 1070000];
  const cashEquips: number[] = [];

  // Equips
  // TODO: Equip loop 1
  // TODO: Equip loop 2

  equips.forEach((equip, index) => {
    packet.writeUByte(index);
    packet.writeUInt(equip);
  });

  packet.writeUByte(0xff);

  // TODO: Cash equip loop
  cashEquips.forEach((equip, index) => {
    packet.writeUByte(index);
    packet.writeUInt(equip);
  });

  packet.writeUByte(0xff);

  packet.writeUInt(1302000); // TODO: weaponId
  // TODO: Pets
  packet.writeInt(0); // pet 1
  packet.writeInt(0); // pet 2
  packet.writeInt(0); // pet 3

  return packet;
}
