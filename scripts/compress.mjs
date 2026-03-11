import sharp from "sharp";
import { readdirSync, mkdirSync, statSync } from "fs";
import { join, basename, extname } from "path";

const INPUT_DIR = "./olamide";
const OUTPUT_DIR = "./public/images";
const MAX_WIDTH = 1200;

mkdirSync(OUTPUT_DIR, { recursive: true });

// Clean name map: original filename → clean output name
const nameMap = {
  "photoshoot 25th v3( fav).JPG": "hero.webp",
  "photoshoot 25th v1.JPG": "shoot-1.webp",
  "photoshoot 25th v2.JPG": "shoot-2.webp",
  "photoshoot 25th v4.JPG": "shoot-4.webp",
  "24th birthdayshoot.HEIC": "shoot-24th.webp",
  "when the love began.JPG": "love-began.webp",
  "first date( see lagos).JPG": "first-date.webp",
  "at my place.JPG": "at-my-place.webp",
  "at my place 2.JPG": "at-my-place-2.webp",
  "at the genesis cinema.JPG": "genesis-cinema.webp",
  "modelaa.JPG": "model.webp",
  "eid  dress.JPG": "eid-dress.webp",
  "islamic shukurah( one fo my fav).jpg": "islamic.webp",
  "baby shukurat.jpg": "baby.webp",
  "ramadan date 24.HEIC": "ramadan-date.webp",
  "ramadan date 24 v2.HEIC": "ramadan-date-2.webp",
  "random date.HEIC": "random-date.webp",
  "random owambe.HEIC": "owambe.webp",
  "takwabay beach.HEIC": "beach.webp",
};

let totalBefore = 0;
let totalAfter = 0;

for (const [original, output] of Object.entries(nameMap)) {
  const inputPath = join(INPUT_DIR, original);
  const outputPath = join(OUTPUT_DIR, output);

  try {
    const before = statSync(inputPath).size;
    totalBefore += before;

    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(outputPath);

    const after = statSync(outputPath).size;
    totalAfter += after;

    const saved = (((before - after) / before) * 100).toFixed(0);
    console.log(`✓ ${original.padEnd(45)} → ${output.padEnd(25)} ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (-${saved}%)`);
  } catch (e) {
    console.error(`✗ ${original}: ${e.message}`);
  }
}

console.log(`\n📦 Total: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB (${(((totalBefore-totalAfter)/totalBefore)*100).toFixed(0)}% reduction)`);
