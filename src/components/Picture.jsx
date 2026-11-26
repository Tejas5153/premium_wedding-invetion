import { useEffect, useRef, useState } from 'react'
import { imageInfo } from '../data/images'

// Shown only if an image genuinely fails to load.
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#ead9bc'/><stop offset='1' stop-color='#d9b98a'/></linearGradient></defs><rect width='400' height='300' fill='url(#g)'/><g fill='none' stroke='#a97f3f' stroke-opacity='.55' stroke-width='1.2'><circle cx='200' cy='150' r='26'/><ellipse cx='200' cy='118' rx='9' ry='22'/><ellipse cx='200' cy='182' rx='9' ry='22'/><ellipse cx='168' cy='150' rx='22' ry='9'/><ellipse cx='232' cy='150' rx='22' ry='9'/></g></svg>",
  )

/**
 * Responsive, layout-stable image with a blurred placeholder and an error fallback.
 * `src` must be a value from `img` (data/images.js).
 * Not lazy by default: pass priority for above-the-fold images, otherwise it lazy-loads.
 */
export default function Picture({ ref: outerRef, src, alt = '', sizes = '100vw', priority = false, className, style, draggable, ...rest }) {
  const info = imageInfo[src]
  const ref = useRef(null)
  const [failed, setFailed] = useState(false)

  const setRef = (el) => {
    ref.current = el
    if (typeof outerRef === 'function') outerRef(el)
    else if (outerRef) outerRef.current = el
  }

  // An image that errored before React attached its handler never fires onError again.
  useEffect(() => {
    const el = ref.current
    if (el && el.complete && el.naturalWidth === 0) setFailed(true)
  }, [])

  const bg = info && !failed ? { backgroundImage: `url(${info.lqip})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined

  return (
    <img
      ref={setRef}
      className={className}
      src={failed ? FALLBACK : src}
      srcSet={failed ? undefined : info?.srcSet}
      sizes={failed ? undefined : info ? sizes : undefined}
      width={info?.width}
      height={info?.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? undefined : 'async'}
      draggable={draggable}
      onError={() => setFailed(true)}
      style={{ ...bg, ...style }}
      {...rest}
    />
  )
}
