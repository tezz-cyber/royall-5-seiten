import crypto from "node:crypto";
if (!globalThis.crypto) {
  globalThis.crypto = crypto.webcrypto;
}
await import("./dist/server/entry.mjs");
