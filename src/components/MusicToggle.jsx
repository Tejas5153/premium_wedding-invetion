import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './MusicToggle.css'

export default function MusicToggle() {
  const audio = useRef(null)
  const [on, setOn] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const el = audio.current
    return () => el && el.pause()
  }, [])

  const toggle = async () => {
    const el = audio.current
    if (!el) return
    if (on) {
      el.pause()
      setOn(false)
      return
    }
    try {
      el.volume = 0.55
      await el.play()
      setOn(true)
      setError(false)
    } catch {
      setError(true)
    }
  }

  return (
    <>
      <audio ref={audio} loop preload="none">
        <source src="/sitar.m4a" type="audio/mp4" />
        <source src="/sitar.ogg" type="audio/ogg" />
      </audio>
      <motion.button
        type="button"
        className={`music${on ? ' is-on' : ''}`}
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? 'Pause background music' : 'Play background music'}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        whileTap={{ scale: 0.94 }}
      >
        <span className="music__bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="music__label">{on ? 'Music on' : 'Music'}</span>
      </motion.button>
      <AnimatePresence>
        {error && (
          <motion.p className="music__err" role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onAnimationComplete={() => setTimeout(() => setError(false), 2600)}>
            Audio couldn’t start on this device.
          </motion.p>
        )}
      </AnimatePresence>
    </>
  )
}
