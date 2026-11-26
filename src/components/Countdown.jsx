import { AnimatePresence, motion } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'
import { couple } from '../data/content'
import { Reveal } from './Reveal'
import { Flower } from './Ornaments'
import './Countdown.css'

function Digits({ value, label }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="cd__unit">
      <div className="cd__num" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: '60%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-60%', opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 0.8, 0.24, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="cd__label">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(couple.target)

  return (
    <section className="section cd" id="countdown" aria-labelledby="cd-title">
      <Flower className="cd__flower" petals={12} />
      <div className="container cd__inner">
        <Reveal as="p" className="eyebrow" y={10}>
          Counting down to
        </Reveal>
        <Reveal as="h2" className="cd__title" id="cd-title" delay={0.1}>
          {done ? (
            <>
              Today, we are <em>married</em>
            </>
          ) : (
            <>
              Until we say <em>“I do”</em>
            </>
          )}
        </Reveal>

        <Reveal className="cd__grid" delay={0.2} role="timer" aria-label={`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds until the wedding`}>
          <Digits value={days} label="Days" />
          <Digits value={hours} label="Hours" />
          <Digits value={minutes} label="Minutes" />
          <Digits value={seconds} label="Seconds" />
        </Reveal>

        <Reveal as="p" className="cd__foot" delay={0.3}>
          Sunday, 20 December 2026 · 7:00 PM IST
        </Reveal>
      </div>
    </section>
  )
}
