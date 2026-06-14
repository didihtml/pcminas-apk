import Jimp from 'jimp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '../public')

const PUC_BLUE = 0x1E5FA8FF

async function generate() {
  // Load the source logo
  const logo = await Jimp.read(join(publicDir, 'logo-puc-white.png'))

  // Make every non-transparent pixel pure white, and very-light pixels transparent
  logo.scan(0, 0, logo.bitmap.width, logo.bitmap.height, function (x, y, idx) {
    const r = this.bitmap.data[idx]
    const g = this.bitmap.data[idx + 1]
    const b = this.bitmap.data[idx + 2]

    // White/near-white background → fully transparent
    if (r > 220 && g > 220 && b > 220) {
      this.bitmap.data[idx + 3] = 0
    } else {
      // All other pixels → pure white
      this.bitmap.data[idx]     = 255
      this.bitmap.data[idx + 1] = 255
      this.bitmap.data[idx + 2] = 255
    }
  })

  for (const size of [192, 512]) {
    const bg = await new Promise((res, rej) =>
      new Jimp(size, size, PUC_BLUE, (err, img) => (err ? rej(err) : res(img)))
    )

    const logoResized = logo.clone().resize(Math.round(size * 0.75), Jimp.AUTO)
    const x = Math.round((size - logoResized.bitmap.width) / 2)
    const y = Math.round((size - logoResized.bitmap.height) / 2)

    bg.composite(logoResized, x, y)
    await bg.writeAsync(join(publicDir, `icon-${size}.png`))
    console.log(`✓ icon-${size}.png gerado`)
  }
}

generate().catch(console.error)
