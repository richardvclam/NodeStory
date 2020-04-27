import { createPacketHandler } from '@nodestory/core';

import { LoginClientOpcode } from '../../constants/LoginClientOpcode';
import { createCharacter } from '../../services/CharacterService';
import { createCharacterSuccess } from './CreateCharacter.packet';

export default createPacketHandler(
  LoginClientOpcode.CreateCharacter,
  async (client, packet) => {
    const name = packet.readString();
    const job = packet.readInt();
    const face = packet.readInt();
    const hair = packet.readInt();
    const hairColor = packet.readInt();
    const skin = packet.readInt();
    const top = packet.readInt();
    const bottom = packet.readInt();
    const shoes = packet.readInt();
    const weapon = packet.readInt();
    const gender = packet.readByte();

    if (!client.account) {
      throw new Error("No account attached to client.");
    }

    if (typeof client.world === "undefined") {
      throw new Error("No world attached to client.");
    }

    let jobId;
    switch (job) {
      case 0:
        jobId = 1000;
        break;
      case 1:
        jobId = 0;
        break;
      case 2:
        jobId = 2000;
      default:
        throw new Error(
          `Attempted to create a character with an unsupported job: ${job}`,
        );
    }

    const character = await createCharacter({
      _accountId: client.account._id,
      world: client.world,
      name,
      gender,
      face,
      hair,
      hairColor,
      skin,
      stats: {
        level: 1,
        job: jobId,
        str: 4,
        dex: 4,
        int: 4,
        luk: 4,
        hp: 100,
        maxHp: 100,
        mp: 100,
        maxMp: 100,
      },
      map: 1,
      mapSpawn: 1,
      inventory: {
        top,
        bottom,
        shoes,
        weapon,
      },
    } as any);

    if (!character) {
      throw new Error("Something went wrong with creating a character.");
    }

    return client.sendPacket(createCharacterSuccess(character));
  },
);
