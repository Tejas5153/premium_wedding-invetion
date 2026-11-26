import { useState } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import Envelope from './components/Envelope'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Story from './components/Story'
import Events from './components/Events'
import Gallery from './components/Gallery'
import Film from './components/Film'
import Venue from './components/Venue'
import Rsvp from './components/Rsvp'
import Guestbook from './components/Guestbook'
import Finale from './components/Finale'
import MusicToggle from './components/MusicToggle'

export default function App() {
  const [opened, setOpened] = useState(false)
  // the hero begins its entrance as the card expands, slightly before the envelope unmounts
  const [heroReady, setHeroReady] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#countdown">
        Skip to content
      </a>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <MusicToggle />

      {!opened && (
        <Envelope
          onOpened={() => {
            setOpened(true)
            window.scrollTo(0, 0)
          }}
          onExpand={() => setHeroReady(true)}
        />
      )}

      <main inert={!opened ? true : undefined}>
        <Hero ready={heroReady || opened} />
        <Countdown />
        <Story />
        <Events />
        <Gallery />
        <Film />
        <Venue />
        <Rsvp />
        <Guestbook />
      </main>
      <Finale />
    </MotionConfig>
  )
}
