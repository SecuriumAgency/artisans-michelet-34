const path = require("node:path");
const fs = require("node:fs");
const sharp = require("sharp");

const SOURCE = path.join(__dirname, "..", "public", "logo-michelet.png");
const OUT_DIR = path.join(__dirname, "..", "public", "images", "ads");
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

const TARGETS = [
  { name: "logo-ads-square.png", width: 1200, height: 1200 },
  { name: "logo-ads-landscape.png", width: 1200, height: 628 },
];

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const { name, width, height } of TARGETS) {
    const outPath = path.join(OUT_DIR, name);

    await sharp(SOURCE)
      .resize({
        width,
        height,
        fit: "contain",
        background: WHITE,
        kernel: sharp.kernel.lanczos3,
      })
      .flatten({ background: WHITE })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outPath);

    const { size } = fs.statSync(outPath);
    console.log(`${name}: ${width}x${height}, ${(size / 1024).toFixed(1)} Ko`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
