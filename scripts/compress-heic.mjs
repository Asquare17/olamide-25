import sharp from "sharp";
import { statSync } from "fs";

const heicMap = {
  "/tmp/heic-temp/24th birthdayshoot.jpg": "public/images/shoot-24th.webp",
  "/tmp/heic-temp/ramadan date 24.jpg": "public/images/ramadan-date.webp",
  "/tmp/heic-temp/ramadan date 24 v2.jpg": "public/images/ramadan-date-2.webp",
  "/tmp/heic-temp/random date.jpg": "public/images/random-date.webp",
  "/tmp/heic-temp/random owambe.jpg": "public/images/owambe.webp",
  "/tmp/heic-temp/takwabay beach.jpg": "public/images/beach.webp",
};

let totalBefore = 0, totalAfter = 0;

for (const [input, output] of Object.entries(heicMap)) {
  const before = statSync(input).size;
  totalBefore += before;
  await sharp(input)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(output);
  const after = statSync(output).size;
  totalAfter += after;
  const saved = (((before - after) / before) * 100).toFixed(0);
  console.log(`✓ ${input.split("/").pop().padEnd(35)} → ${output.split("/").pop().padEnd(25)} ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (-${saved}%)`);
}

console.log(`\n📦 HEIC total: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB`);
