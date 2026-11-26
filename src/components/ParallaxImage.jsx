import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Picture from './Picture'

const MotionPicture = motion.create(Picture)

/** Image with subtle scroll parallax inside a fixed-ratio frame. */
export default function ParallaxImage({ src, alt, className = '', speed = 7, eager = false, sizes = '100vw', style }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`])

  return (
    <div ref={ref} className={`pimg ${className}`} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <MotionPicture
        src={src}
        alt={alt}
        sizes={sizes}
        priority={eager}
        style={{ y, width: '100%', height: '100%', objectFit: 'cover', scale: 1 + (speed * 2.2) / 100 }}
      />
    </div>
  )
}
