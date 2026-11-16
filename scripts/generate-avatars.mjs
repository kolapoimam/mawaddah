#!/usr/bin/env node
/**
 * Generates DiceBear "notionists" avatars for every person in src/data/testimonials.ts
 * into public/avatars. Run with `npm run avatars`.
 * Avatars are saved as static files so the DiceBear library is not shipped to visitors.
 */
import { createAvatar } from "@dicebear/core";
import * as notionists from "@dicebear/notionists";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(join(root, "src/data/testimonials.ts"), "utf8");
const names = [...source.matchAll(/couple: \["([^"]+)", "([^"]+)"\]/g)].flatMap((m) => [m[1], m[2]]);

// Solid brand colours: pink for the first person, gold tint for the second
const backgrounds = ["ffdee2", "f5e7a8"];

await mkdir(join(root, "public/avatars"), { recursive: true });
for (const [i, name] of names.entries()) {
  const svg = createAvatar(notionists, {
    seed: `mawaddah-${name}`,
    size: 96,
    radius: 50,
    backgroundColor: [backgrounds[i % 2]],
  }).toString();
  await writeFile(join(root, "public/avatars", `${name.toLowerCase()}.svg`), svg);
}
console.log(`avatars: wrote ${names.length} files to public/avatars`);
