export function encrypt(data: Buffer): Buffer {
  const { length } = data;
  let j;
  let a;
  let c;

  for (let i = 0; i < 3; i++) {
    a = 0;
    for (j = length; j > 0; j--) {
      c = data[length - j];
      c = rollLeft(c, 3);
      c += j;
      c &= 0xff; // Addition
      c ^= a;
      a = c;
      c = rollRight(a, j);
      c ^= 0xff;
      c += 0x48;
      c &= 0xff; // Addition
      data[length - j] = c;
    }
    a = 0;
    for (j = length; j > 0; j--) {
      c = data[j - 1];
      c = rollLeft(c, 4);
      c += j;
      c &= 0xff; // Addition
      c ^= a;
      a = c;
      c ^= 0x13;
      c = rollRight(c, 3);
      data[j - 1] = c;
    }
  }

  return data;
}

export function decrypt(data: Buffer) {
  const { length } = data;
  let j;
  let a;
  let b;
  let c;

  for (let i = 0; i < 3; i++) {
    a = 0;
    b = 0;
    for (j = length; j > 0; j--) {
      c = data[j - 1];
      c = rollLeft(c, 3);
      c ^= 0x13;
      a = c;
      c ^= b;
      c -= j;
      c &= 0xff; // Addition
      c = rollRight(c, 4);
      b = a;
      data[j - 1] = c;
    }
    a = 0;
    b = 0;
    for (j = length; j > 0; j--) {
      c = data[length - j];
      c -= 0x48;
      c &= 0xff; // Addition
      c ^= 0xff;
      c = rollLeft(c, j);
      a = c;
      c ^= b;
      c -= j;
      c &= 0xff; // Addition
      c = rollRight(c, 3);
      b = a;
      data[length - j] = c;
    }
  }

  return data;
}

function rollLeft(value: number, shift: number): number {
  const overflow = ((value >>> 0) << shift % 8) >>> 0;
  const ret = ((overflow & 0xff) | (overflow >>> 8)) & 0xff;
  return ret;
}

function rollRight(value: number, shift: number): number {
  const overflow = ((value >>> 0) << 8) >>> shift % 8;
  const ret = ((overflow & 0xff) | (overflow >>> 8)) & 0xff;
  return ret;
}
