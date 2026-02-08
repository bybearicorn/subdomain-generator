import { dictionary } from "./dictionary.js";
import { webcrypto as crypto } from "node:crypto";

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";
const CHAR_LEN = CHARS.length;

function secureUint32() {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0];
}

function randomInt(maxExclusive) {
  if (maxExclusive <= 0) throw new Error("maxExclusive must be > 0");

  const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;

  let x;
  do {
    x = secureUint32();
  } while (x >= limit);

  return x % maxExclusive;
}

function randomLetters(length = 12) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARS[randomInt(CHAR_LEN)];
  }
  return result;
}

export default function generateSubdomain(options = {}) {
  const { suffixLength = 12, separator = "-" } = options;
  const word = dictionary[randomInt(dictionary.length)];
  return `${word}${separator}${randomLetters(suffixLength)}`;
}
