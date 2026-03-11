import sharp from "sharp";
import { copyFileSync, renameSync } from "fs";

const FILES = [
  "public/images/owambe.webp",
  "public/images/ramadan-date.webp",
  "public/images/ramadan-date-2.webp",
  "public/images/beach.webp",
  "public/images/shoot-24th.webp",
];

for (const file of FILES) {
  const tmp = file.replace(".webp", ".tmp.webp");
  await sharp(file)
    .rotate(90)           // rotate 90° clockwise to fix the left-rotation
    .webp({ quality: 82 })
    .toFile(tmp);
  renameSync(tmp, file);
  console.log(`✓ fixed: ${file}`);
}
