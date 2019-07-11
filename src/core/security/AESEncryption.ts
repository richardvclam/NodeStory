import { createCipheriv } from "crypto";

import cryptoConfig from "../../config/crypto.config.json";

const aesKey = Buffer.from(cryptoConfig.aesKey);
const cipher = createCipheriv(cryptoConfig.aesAlgorithm, aesKey, "");

export function transform(data: Buffer, iv: Uint8Array): Buffer {
  const { length } = data;
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
    const block = Math.min(length - i, i === 0 ? 1456 : 1460);

    let xorKey = ivCopy.slice();

    for (let j = 0; j < block; j++) {
      if (j % 16 === 0) {
        xorKey = cipher.update(xorKey);
      }

      data[i + j] ^= xorKey[j % 16];
    }

    i += block;
  }

  return data;
}
