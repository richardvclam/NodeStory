import { createCipheriv } from "crypto";

import cryptoConfig from "../../config/crypto.config.json";

const aesKey = Buffer.from(cryptoConfig.aesKey);
const cipher = createCipheriv(cryptoConfig.aesAlgorithm, aesKey, "");

export function transform(data: Buffer, iv: Uint8Array): Buffer {
  const { length } = data;

  // MapleStory's 1460 byte block
  const blockLength = 1460;
  let currentBlockLength = 1456;

  const ivCopy = Buffer.from([
    iv[0],
    iv[1],
    iv[2],
    iv[3],
    iv[0],
    iv[1],
    iv[2],
    iv[3],
    iv[0],
    iv[1],
    iv[2],
    iv[3],
    iv[0],
    iv[1],
    iv[2],
    iv[3],
  ]);

  for (let i = 0; i < length; ) {
    const block = Math.min(length - i, currentBlockLength);

    // Get a new copy of the key
    let xorKey = ivCopy.slice();

    for (let j = 0; j < block; j++) {
      if (j % 16 === 0) {
        xorKey = cipher.update(xorKey);
      }

      data[i + j] ^= xorKey[j % 16];
    }

    i += block;
    currentBlockLength = blockLength;
  }

  return data;
}
