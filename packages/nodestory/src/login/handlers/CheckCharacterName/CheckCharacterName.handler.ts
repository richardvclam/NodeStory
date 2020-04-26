import { createPacketHandler } from '@nodestory/core';

import { LoginClientOpcode } from '../../constants/LoginClientOpcode';
import { findCharacterByName } from '../../services/CharacterService';
import { nameAvailability } from './CheckCharacterName.packet';

export default createPacketHandler(
  LoginClientOpcode.CheckCharacterName,
  async (client, packet) => {
    const name = packet.readString();

    const character = await findCharacterByName(name);
    const isAvailable = !character;

    return client.sendPacket(nameAvailability(name, isAvailable));
  },
);
