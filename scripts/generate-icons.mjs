import Jimp from 'jimp'
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const resDir = join(root, 'android-twa', 'app', 'src', 'main', 'res')
const blue = 0x00578aff
const source = await Jimp.read(join(publicDir, 'icon-reference.png'))
if (source.bitmap.width !== 512 || source.bitmap.height !== 512) throw new Error('A referência deve ter 512 × 512 pixels')

// Preserve the supplied image for ordinary icons. Extract only its white mark
// for the alpha-only themed icon; the blue background is supplied separately.
const mark = source.clone()
mark.scan(0, 0, 512, 512, function (x, y, index) {
  const { data } = this.bitmap
  const brightness = Math.min(data[index], data[index + 1], data[index + 2])
  const insideMark = x >= 120 && x <= 392 && y >= 65 && y <= 415
  const alpha = insideMark ? Math.max(0, Math.min(255, Math.round((brightness - 70) * 255 / 150))) : 0
  data[index] = data[index + 1] = data[index + 2] = 255
  data[index + 3] = Math.round(alpha * data[index + 3] / 255)
})

await source.clone().resize(192, 192).writeAsync(join(publicDir, 'icon-192.png'))
await source.clone().writeAsync(join(publicDir, 'icon-512.png'))
await mark.clone().writeAsync(join(publicDir, 'icon-monochrome-512.png'))
const maskable = new Jimp(512, 512, blue).composite(mark, 0, 0)
await maskable.writeAsync(join(publicDir, 'icon-maskable-512.png'))

// Adaptive icons have a 108dp canvas and a smaller safe area than the PWA.
const foreground = new Jimp(512, 512, 0x00000000)
const insetMark = mark.clone().resize(432, 432)
foreground.composite(insetMark, 40, 40)
for (const [density, factor] of [['mdpi', 1], ['hdpi', 1.5], ['xhdpi', 2], ['xxhdpi', 3], ['xxxhdpi', 4]]) {
  const dir = join(resDir, `mipmap-${density}`)
  await mkdir(dir, { recursive: true })
  const legacySize = Math.round(48 * factor)
  const adaptiveSize = Math.round(108 * factor)
  await source.clone().resize(legacySize, legacySize).writeAsync(join(dir, 'ic_launcher.png'))
  await maskable.clone().resize(adaptiveSize, adaptiveSize).writeAsync(join(dir, 'ic_maskable.png'))
  await foreground.clone().resize(adaptiveSize, adaptiveSize).writeAsync(join(dir, 'ic_launcher_foreground.png'))
  await foreground.clone().resize(adaptiveSize, adaptiveSize).writeAsync(join(dir, 'ic_launcher_monochrome.png'))
}
