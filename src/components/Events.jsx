import { motion } from 'framer-motion'
import { events } from '../data/content'
import { googleCalendarUrl } from '../lib/calendar'
import { Reveal, SectionHeading, EASE } from './Reveal'
import ParallaxImage from './ParallaxImage'
import { Divider } from './Ornaments'
import './Events.css'

function Meta({ e }) {
  return (
    <dl className="ev__meta">
      <div>
        <dt>Date</dt>
        <dd>
          {e.day}, {e.date}
        </dd>
      </div>
      <div>
        <dt>Time</dt>
        <dd>{e.time} IST</dd>
      </div>
      <div>
        <dt>Venue</dt>
        <dd>
          {e.space}
          <br />
          <span>The Royal Orchid Palace, Jaipur</span>
        </dd>
      </div>
      <div>
        <dt>Attire</dt>
        <dd>{e.dress}</dd>
      </div>
    </dl>
  )
}

function Cal({ e, light }) {
  return (
    <a className={`btn${light ? ' btn--light' : ''}`} href={googleCalendarUrl(e)} target="_blank" rel="noopener noreferrer" aria-label={`Add ${e.name} to Google Calendar (opens in a new tab)`}>
      Add to calendar
    </a>
  )
}

function Head({ e, no }) {
  return (
    <>
      <Reveal as="p" className="eyebrow" y={10}>
        {no} · {e.tagline}
      </Reveal>
      <Reveal as="h3" className="ev__name" id={`ev-${e.id}`} delay={0.1}>
        {e.name}
      </Reveal>
      <Reveal as="p" className="ev__blurb" delay={0.18}>
        {e.blurb}
      </Reveal>
    </>
  )
}

function Frame({ children, className, ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.4, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default function Events() {
  const [engagement, haldi, sangeet, wedding, reception] = events

  return (
    <section className="events" id="celebrations" aria-labelledby="events-title">
      <div className="section ev-intro">
        <SectionHeading id="events-title" eyebrow="The celebrations" title={<>Five days of <em>joy</em></>}>
          From a quiet promise to a grand finale — we would love for you to be part of every moment.
        </SectionHeading>
      </div>

      {/* 1 · Engagement — airy editorial split */}
      <article className="ev ev--engagement" aria-labelledby="ev-engagement">
        <div className="ev__grid">
          <Frame className="ev__photo">
            <ParallaxImage src={engagement.image} alt={engagement.alt} speed={7} sizes="(min-width: 900px) 50vw, 100vw" style={{ position: 'absolute', inset: 0 }} />
          </Frame>
          <div className="ev__body">
            <Head e={engagement} no="01" />
            <Reveal delay={0.25}>
              <Meta e={engagement} />
            </Reveal>
            <Reveal delay={0.3}>
              <Cal e={engagement} />
            </Reveal>
          </div>
        </div>
      </article>

      {/* 2 · Haldi — warm turmeric, arch frame */}
      <article className="ev ev--haldi" aria-labelledby="ev-haldi">
        <div className="ev__grid ev__grid--rev">
          <Frame className="ev__photo ev__photo--arch">
            <ParallaxImage src={haldi.image} alt={haldi.alt} speed={6} sizes="(min-width: 900px) 50vw, 100vw" style={{ position: 'absolute', inset: 0 }} />
          </Frame>
          <div className="ev__body">
            <Head e={haldi} no="02" />
            <Reveal delay={0.25}>
              <Meta e={haldi} />
            </Reveal>
            <Reveal delay={0.3}>
              <Cal e={haldi} />
            </Reveal>
          </div>
        </div>
      </article>

      {/* 3 · Sangeet — dark & gold, oval portrait */}
      <article className="ev ev--sangeet" aria-labelledby="ev-sangeet">
        <div className="ev__grid">
          <Frame className="ev__photo ev__photo--oval">
            <ParallaxImage src={sangeet.image} alt={sangeet.alt} speed={5} sizes="(min-width: 900px) 50vw, 100vw" style={{ position: 'absolute', inset: 0 }} />
          </Frame>
          <div className="ev__body">
            <Head e={sangeet} no="03" />
            <Reveal delay={0.25}>
              <Meta e={sangeet} />
            </Reveal>
            <Reveal delay={0.3}>
              <Cal e={sangeet} light />
            </Reveal>
          </div>
        </div>
      </article>

      {/* 4 · Wedding — full-bleed cinematic centrepiece */}
      <article className="ev ev--wedding" aria-labelledby="ev-wedding">
        <ParallaxImage src={wedding.image} alt={wedding.alt} speed={9} className="ev__bleed" />
        <div className="ev__veil" />
        <div className="ev__center">
          <Reveal as="p" className="eyebrow eyebrow--light" y={10}>
            04 · {wedding.tagline}
          </Reveal>
          <Reveal as="h3" className="ev__name ev__name--xl" id="ev-wedding" delay={0.1}>
            {wedding.name}
          </Reveal>
          <Reveal delay={0.2}>
            <Divider className="ev__divider" />
          </Reveal>
          <Reveal as="p" className="ev__big" delay={0.25}>
            {wedding.day}, {wedding.date}
            <br />
            {wedding.time} IST
          </Reveal>
          <Reveal as="p" className="ev__where" delay={0.3}>
            {wedding.space} · The Royal Orchid Palace, Jaipur
            <br />
            Attire — {wedding.dress}
          </Reveal>
          <Reveal delay={0.35}>
            <Cal e={wedding} light />
          </Reveal>
        </div>
      </article>

      {/* 5 · Reception — blush, offset frame */}
      <article className="ev ev--reception" aria-labelledby="ev-reception">
        <div className="ev__grid ev__grid--rev">
          <Frame className="ev__photo ev__photo--offset">
            <ParallaxImage src={reception.image} alt={reception.alt} speed={6} sizes="(min-width: 900px) 50vw, 100vw" style={{ position: 'absolute', inset: 0 }} />
          </Frame>
          <div className="ev__body">
            <Head e={reception} no="05" />
            <Reveal delay={0.25}>
              <Meta e={reception} />
            </Reveal>
            <Reveal delay={0.3}>
              <Cal e={reception} />
            </Reveal>
          </div>
        </div>
      </article>
    </section>
  )
}
