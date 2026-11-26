import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Flower, Divider, Sprig } from './Ornaments'
import { couple } from '../data/content'
import { useBodyLock } from '../hooks/useBodyLock'
import { EASE } from './Reveal'
import './Envelope.css'

/*
  Stages
  0 idle · 1 seal cracks · 2 flap opens · 3 card rises · 4 card expands into the site
*/
export default function Envelope({ onOpened, onExpand }) {
  const reduce = useReducedMotion()
  const f = reduce ? 0.15 : 1 // global time-scale for the sequence
  const [stage, setStage] = useState(0)
  const [flapBehind, setFlapBehind] = useState(false)
  const timers = useRef([])

  useBodyLock(true)

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const open = () => {
    if (stage !== 0) return
    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms * f))
    setStage(1)
    at(650, () => setStage(2))
    at(1100, () => setFlapBehind(true))
    at(1750, () => setStage(3))
    at(3000, () => setStage(4))
    at(3500, () => onExpand?.())
    at(4500, () => onOpened())
  }

  const idle = stage === 0

  return (
    <motion.div
      className="intro"
      role="dialog"
      aria-label="Wedding invitation envelope"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage >= 4 ? 0 : 1 }}
      transition={{ duration: 1 * f, delay: stage >= 4 ? 0.55 * f : 0, ease: 'easeInOut' }}
    >
      <div className="intro__deco" aria-hidden="true">
        <Flower className="intro__flower intro__flower--tl" />
        <Flower className="intro__flower intro__flower--br" petals={12} />
        <Sprig className="intro__sprig intro__sprig--l" />
        <Sprig className="intro__sprig intro__sprig--r" />
      </div>

      <motion.p
        className="intro__kicker"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: stage >= 3 ? 0 : 1, y: 0 }}
        transition={{ duration: 1.2 * f, delay: idle ? 0.3 : 0 }}
      >
        You are invited
      </motion.p>

      <motion.button
        type="button"
        className="env-btn"
        onClick={open}
        aria-label="Open the wedding invitation"
        disabled={!idle}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3 * f, ease: EASE, delay: 0.2 * f }}
      >
        <motion.span
          className="env"
          animate={idle && !reduce ? { y: [0, -7, 0], rotate: [0, -0.4, 0] } : { y: 0, rotate: 0 }}
          transition={idle ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.6 }}
        >
          <span className="env__back" />

          {/* the invitation card */}
          <motion.span
            className={`env__card${stage >= 4 ? ' is-front' : ''}`}
            initial={false}
            animate={
              stage >= 4
                ? { y: '-22%', scale: reduce ? 1 : 6.5, opacity: reduce ? 0 : 1 }
                : stage >= 3
                  ? { y: '-60%', scale: 1, opacity: 1 }
                  : { y: '0%', scale: 1, opacity: 1 }
            }
            transition={{
              duration: stage >= 4 ? 1.5 * f : 1.15 * f,
              ease: stage >= 4 ? [0.7, 0, 0.3, 1] : EASE,
            }}
          >
            <span className="card__frame">
              <span className="card__small">Together with their families</span>
              <span className="card__names">
                Aarav <i>&amp;</i> Siya
              </span>
              <Divider className="card__divider" />
              <span className="card__small card__small--italic">request the pleasure of your company</span>
              <span className="card__date">{couple.dateShort}</span>
              <span className="card__small">Jaipur, India</span>
            </span>
          </motion.span>

          {/* envelope front pocket */}
          <span className="env__pocket">
            <span className="env__tri env__tri--l" />
            <span className="env__tri env__tri--r" />
            <span className="env__tri env__tri--b" />
          </span>

          {/* flap */}
          <motion.span
            className="env__flap"
            style={{ zIndex: flapBehind ? 1 : 4 }}
            animate={{ rotateX: stage >= 2 ? 180 : 0 }}
            transition={{ duration: 1.05 * f, ease: [0.5, 0.05, 0.25, 1] }}
          >
            <span className="env__face env__face--front" />
            <span className="env__face env__face--back" />
          </motion.span>

          {/* wax seal */}
          <motion.span
            className={`seal${idle ? ' is-idle' : ''}`}
            animate={stage >= 1 ? { scale: [1, 1.14, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 * f }}
            style={{ pointerEvents: 'none' }}
          >
            {['l', 'r'].map((side) => (
              <motion.span
                key={side}
                className={`seal__half seal__half--${side}`}
                animate={
                  stage >= 1
                    ? { x: side === 'l' ? -34 : 34, y: 46, rotate: side === 'l' ? -28 : 28, opacity: 0 }
                    : { x: 0, y: 0, rotate: 0, opacity: 1 }
                }
                transition={{ duration: 0.85 * f, ease: EASE, delay: stage >= 1 ? 0.18 * f : 0 }}
              >
                <span className="seal__disc">
                  <span className="seal__ring" />
                  <span className="seal__mono">A&amp;S</span>
                </span>
              </motion.span>
            ))}
          </motion.span>
        </motion.span>
      </motion.button>

      <motion.div
        className="intro__foot"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 3 ? 0 : 1 }}
        transition={{ duration: 1.2 * f, delay: idle ? 0.8 : 0 }}
      >
        <p className="intro__names">
          {couple.groomFirst} <i>&amp;</i> {couple.brideFirst}
        </p>
        <p className="intro__date">{couple.dateLong}</p>
        <p className={`intro__hint${idle ? '' : ' is-hidden'}`}>Tap the seal to open</p>
      </motion.div>
    </motion.div>
  )
}
