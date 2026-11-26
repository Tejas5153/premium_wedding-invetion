import meta from './imageMeta.json'

// Every generated file, keyed by path, resolved to its final hashed URL by Vite.
const files = import.meta.glob('../assets/img/*.webp', { eager: true, query: '?url', import: 'default' })

const urlOf = (name, width) => files[`../assets/img/${name}-${width}.webp`]

export const img = {}
/** url -> { srcSet, width, height, lqip } so <Picture> can look up everything from a plain src. */
export const imageInfo = {}

for (const [name, m] of Object.entries(meta)) {
  const mid = m.widths.includes(800) ? 800 : m.widths[m.widths.length - 1]
  const src = urlOf(name, mid)
  img[name] = src
  imageInfo[src] = {
    srcSet: m.widths.map((w) => `${urlOf(name, w)} ${w}w`).join(', '),
    width: m.width,
    height: m.height,
    lqip: m.lqip,
  }
}
