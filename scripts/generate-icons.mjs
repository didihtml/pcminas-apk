import Jimp from "jimp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "../public");

const PUC_BLUE = 0x1e5fa8ff;
const DARK_BG = 0x000000ff;
const LOGO_SCALE = 0.75;

async function loadWhiteLogo() {
  // Load the source logo and normalize it to pure white on transparent background.
  const logo = await Jimp.read(join(publicDir, "logo-puc-white.png"));

  logo.scan(0, 0, logo.bitmap.width, logo.bitmap.height, function (x, y, idx) {
    const a = this.bitmap.data[idx + 3];

    if (a < 10) {
      // Keep transparent pixels fully transparent
      this.bitmap.data[idx + 3] = 0;
    } else {
      // Any opaque pixel becomes pure white and fully opaque
      this.bitmap.data[idx] = 255;
      this.bitmap.data[idx + 1] = 255;
      this.bitmap.data[idx + 2] = 255;
      this.bitmap.data[idx + 3] = 255;
    }
  });

  return logo;
}

async function generateIcon(logo, size, bgColor, outputPath) {
  const bg = await new Promise(
    (res, rej) =>
      new Jimp(size, size, bgColor, (err, img) => (err ? rej(err) : res(img))),
  );

  const logoResized = logo
    .clone()
    .resize(Math.round(size * LOGO_SCALE), Jimp.AUTO);

  // Threshold keeps the logo crisp after resizing (no semi-transparent gray edges)
  logoResized.scan(
    0,
    0,
    logoResized.bitmap.width,
    logoResized.bitmap.height,
    function (x, y, idx) {
      if (this.bitmap.data[idx + 3] > 0) {
        this.bitmap.data[idx] = 255;
        this.bitmap.data[idx + 1] = 255;
        this.bitmap.data[idx + 2] = 255;
        this.bitmap.data[idx + 3] = 255;
      }
    },
  );

  const x = Math.round((size - logoResized.bitmap.width) / 2);
  const y = Math.round((size - logoResized.bitmap.height) / 2);

  bg.composite(logoResized, x, y);
  await bg.writeAsync(outputPath);
}

async function generate() {
  const logo = await loadWhiteLogo();

  // Standard icons used by the manifest (light/default theme)
  for (const size of [192, 512]) {
    await generateIcon(
      logo,
      size,
      PUC_BLUE,
      join(publicDir, `icon-${size}.png`),
    );
    console.log(`✓ icon-${size}.png gerado`);
  }

  // Dark-mode variants
  for (const size of [192, 512]) {
    await generateIcon(
      logo,
      size,
      DARK_BG,
      join(publicDir, `icon-${size}-dark.png`),
    );
    console.log(`✓ icon-${size}-dark.png gerado`);
  }

  // Apple touch icons (iOS 18+ automatically picks apple-touch-icon-dark.png in dark mode)
  await generateIcon(
    logo,
    180,
    PUC_BLUE,
    join(publicDir, "apple-touch-icon.png"),
  );
  console.log("✓ apple-touch-icon.png gerado");

  await generateIcon(
    logo,
    180,
    DARK_BG,
    join(publicDir, "apple-touch-icon-dark.png"),
  );
  console.log("✓ apple-touch-icon-dark.png gerado");
}

generate().catch(console.error);
