export function parseIPAddressToBytes(ip: string): Uint8Array {
  const ipParts = ip.split(".");
  return Uint8Array.from(ipParts.map((part) => parseInt(part)));
}
