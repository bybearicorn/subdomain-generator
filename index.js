import { dictionary } from "./dictionary.js";

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";
const CHAR_LEN = CHARS.length;

function getCryptoObj() {
  // browser: globalThis.crypto
  // node: global crypto (Node 19+) or require("crypto").webcrypto (Node 15+)
  const g = typeof globalThis !== "undefined" ? globalThis : undefined;

  if (g && g.crypto && typeof g.crypto.getRandomValues === "function") {
    return g.crypto;
  }

  // node fallback
  try {
    const nodeCrypto = require("crypto");
    if (nodeCrypto.webcrypto && typeof nodeCrypto.webcrypto.getRandomValues === "function") {
      return nodeCrypto.webcrypto;
    }
  } catch (_) {}

  return null;
}

const cryptoObj = getCryptoObj();

function secureUint32() {
  if (cryptoObj) {
    const a = new Uint32Array(1);
    cryptoObj.getRandomValues(a);
    return a[0];
  }

  // fallback (NOT cryptographically secure)
  return (Math.random() * 0x100000000) >>> 0;
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
