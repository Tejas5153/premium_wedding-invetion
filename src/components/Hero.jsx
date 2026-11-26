import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Petals from './Petals'
import { Divider } from './Ornaments'
import { couple, venue } from '../data/content'
import { img } from '../data/images'
import Picture from './Picture'
import { EASE } from './Reveal'
import './Hero.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.28, delayChildren: 0.2 } },
}
const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: EASE } },
}
const line = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.5, ease: EASE } },
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const petalCount = typeof window !== 'undefined' && window.innerWidth < 640 ? 9 : 16

  return (
    <section className="hero" id="top" ref={ref} aria-label="Welcome">
      <motion.div className="hero__media" style={{ y: imgY }}>
        <Picture className="hero__img" src={img.hero} alt="" sizes="100vw" priority />
      </motion.div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />
      {ready && <Petals count={petalCount} />}

      <motion.div className="hero__content" style={{ y: textY, opacity: fade }} variants={container} initial="hidden" animate={ready ? 'show' : 'hidden'}>
        <motion.p className="hero__eyebrow" variants={rise}>
          The wedding of
        </motion.p>

        <h1 className="hero__names">
          <span className="hero__mask">
            <motion.span className="hero__name" variants={line}>
              {couple.groomFirst}
            </motion.span>
          </span>
          <span className="hero__mask hero__amp-mask" aria-hidden="true">
            <motion.span className="hero__amp" variants={line}>
              &amp;
            </motion.span>
          </span>
          <span className="sr-only"> and </span>
          <span className="hero__mask">
            <motion.span className="hero__name" variants={line}>
              {couple.brideFirst}
            </motion.span>
          </span>
        </h1>

        <motion.div variants={rise} className="hero__meta">
          <Divider className="hero__divider" />
          <p className="hero__date">{couple.dateLong}</p>
          <p className="hero__place">
            {venue.name} <span aria-hidden="true">·</span> Jaipur
          </p>
        </motion.div>
      </motion.div>

      <motion.a
        href="#countdown"
        className="hero__scroll"
        aria-label="Scroll to the countdown"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 2.4, duration: 1.2 }}
      >
        <span>Scroll</span>
        <i aria-hidden="true" />
      </motion.a>
    </section>
  )
}
