/**
 * Rigenera messages/en.json traducendo ricorsivamente messages/it.json via DeepL.
 * Uso: DEEPL_AUTH_KEY=xxx node scripts/deepl-sync-en.mjs
 *
 * Piano Free: https://api-free.deepl.com — la chiave può terminare con :fx
 * Non committare mai la chiave.
 */

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const AUTH_KEY = process.env.DEEPL_AUTH_KEY?.trim();
const API =
  process.env.DEEPL_API_URL?.trim() || "https://api-free.deepl.com/v2/translate";

async function translateOne(text) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${AUTH_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: [text],
      source_lang: "IT",
      target_lang: "EN-GB",
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`DeepL ${res.status}: ${errText}`);
  }
  const data = await res.json();
  return data.translations[0].text;
}

async function deepTranslate(value) {
  if (typeof value === "string") {
    return translateOne(value);
  }
  if (typeof value === "boolean" || typeof value === "number") return value;
  if (Array.isArray(value)) {
    return Promise.all(value.map((v) => deepTranslate(v)));
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (k === "id") {
        out[k] = v;
        continue;
      }
      out[k] = await deepTranslate(v);
    }
    return out;
  }
  return value;
}

async function main() {
  if (!AUTH_KEY) {
    console.error("Imposta DEEPL_AUTH_KEY (variabile d’ambiente).");
    process.exit(1);
  }

  const itPath = join(root, "messages", "it.json");
  const enPath = join(root, "messages", "en.json");
  const it = JSON.parse(await readFile(itPath, "utf8"));

  console.log("Traduzione it → en (DeepL, una stringa alla volta)…");
  const en = await deepTranslate(it);
  await writeFile(enPath, `${JSON.stringify(en, null, 2)}\n`, "utf8");
  console.log("Scritto", enPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
