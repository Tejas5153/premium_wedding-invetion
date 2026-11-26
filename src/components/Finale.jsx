import { motion } from 'framer-motion'
import Petals from './Petals'
import { Flower, Divider, Sprig } from './Ornaments'
import { Reveal, EASE } from './Reveal'
import { couple } from '../data/content'
import { img } from '../data/images'
import Picture from './Picture'
import './Finale.css'

export default function Finale() {
  return (
    <footer className="finale" id="finale">
      <Picture className="finale__bg" src={img.lake} sizes="100vw" />
      <div className="finale__shade" aria-hidden="true" />
      <Petals variant="dust" count={22} />

      <Flower className="finale__flower finale__flower--l" petals={12} />
      <Flower className="finale__flower finale__flower--r" petals={8} />
      <Sprig className="finale__sprig finale__sprig--l" />
      <Sprig className="finale__sprig finale__sprig--r" />

      <div className="finale__inner">
        <Reveal as="p" className="eyebrow eyebrow--light" y={10}>
          With hearts full of gratitude
        </Reveal>
        <Reveal as="p" className="finale__quote" delay={0.15}>
          Two souls, one journey —<br />
          and you, beside us as it begins.
        </Reveal>

        <motion.div
          className="finale__names"
          initial={{ opacity: 0, letterSpacing: '0.3em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.02em' }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <span>{couple.groomFirst}</span>
          <i>&amp;</i>
          <span>{couple.brideFirst}</span>
        </motion.div>

        <Reveal delay={0.2}>
          <Divider className="finale__divider" />
        </Reveal>
        <Reveal as="p" className="finale__date" delay={0.3}>
          {couple.dateShort}
        </Reveal>
        <Reveal as="p" className="finale__place" delay={0.35}>
          The Royal Orchid Palace · Jaipur
        </Reveal>

        <Reveal className="finale__cta" delay={0.4}>
          <a className="btn btn--light" href="#top">
            Back to the beginning
          </a>
        </Reveal>

        <p className="finale__credit">
          A concept by <strong>Momentra Creatives</strong> — a portfolio demo with fictional couple &amp; details.
          <br />
          Photography &amp; music via Wikimedia Commons under open licences (see CREDITS.md).
        </p>
      </div>
    </footer>
  )
}
