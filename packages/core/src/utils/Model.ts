import crypto from 'crypto';

/**
 * Generates a random 4-byte number id.
 * @param bytes
 */
export function generateId(): number {
  return parseInt(crypto.randomBytes(4).toString("hex"), 16);
}
