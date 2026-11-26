import { motion } from 'framer-motion'
import { venue } from '../data/content'
import { img } from '../data/images'
import { mapsDirectionsUrl, mapsSearchUrl, mapsEmbedUrl } from '../lib/calendar'
import { Reveal, SectionHeading, EASE } from './Reveal'
import ParallaxImage from './ParallaxImage'
import './Venue.css'

const details = [
  ['Where', 'Jaipur, Rajasthan — the Pink City'],
  ['Arrive', 'Complimentary valet and shuttle from Jaipur International Airport (about 25 minutes).'],
  ['Stay', 'A block of rooms is held at the palace for out-of-town guests.'],
  ['Parking', 'Valet service at the Royal Gate. Please allow 15 minutes before each event.'],
]

export default function Venue() {
  return (
    <section className="section venue" id="venue" aria-labelledby="venue-title">
      <div className="container">
        <SectionHeading id="venue-title" eyebrow="The venue" title={<>{venue.name}</>}>
          A palace of rose-hued stone, carved balconies and moonlit courtyards — all five celebrations unfold beneath one roof.
        </SectionHeading>

        <div className="venue__grid">
          <motion.div
            className="venue__photo"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.5, ease: EASE }}
          >
            <ParallaxImage src={img.palace} alt="A pink sandstone palace facade in Jaipur" speed={7} sizes="(min-width: 900px) 50vw, 100vw" style={{ position: 'absolute', inset: 0 }} />
            <span className="venue__tag">Jaipur</span>
          </motion.div>

          <div className="venue__info">
            <dl className="venue__list">
              {details.map(([k, v], i) => (
                <Reveal key={k} delay={0.08 * i} className="venue__row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </Reveal>
              ))}
            </dl>
            <Reveal className="venue__actions" delay={0.3}>
              <a className="btn btn--solid" href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
              <a className="link-gold" href={mapsSearchUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal className="venue__map" y={30}>
          <iframe title={`Map showing ${venue.name}, Jaipur`} src={mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </Reveal>
        <p className="venue__note">Demo details: the couple, venue arrangements and map search are fictional for this portfolio piece.</p>
      </div>
    </section>
  )
}
