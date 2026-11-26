import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from '../config'
import { img } from '../data/images'
import Picture from './Picture'
import { SectionHeading, Reveal } from './Reveal'
import { Flower } from './Ornaments'
import './Film.css'

const isEmbed = (url) => /youtube\.com\/embed|youtube-nocookie\.com\/embed|player\.vimeo\.com/.test(url)

export default function Film() {
  const [playing, setPlaying] = useState(false)
  const hasFilm = Boolean(config.filmUrl)

  return (
    <section className="section film" id="film" aria-labelledby="film-title">
      <Flower className="film__flower" petals={12} />
      <div className="container">
        <SectionHeading id="film-title" light eyebrow="The film" title={<>Our story, <em>in motion</em></>}>
          A short film of the moments leading to this celebration.
        </SectionHeading>

        <Reveal className="film__frame" y={40}>
          <div className="film__stage">
            {playing && hasFilm ? (
              isEmbed(config.filmUrl) ? (
                <iframe
                  className="film__media"
                  src={`${config.filmUrl}${config.filmUrl.includes('?') ? '&' : '?'}autoplay=1`}
                  title="Aarav and Siya wedding film"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <video className="film__media" src={config.filmUrl} poster={img.couple} controls autoPlay playsInline />
              )
            ) : (
              <>
                <Picture className="film__poster" src={img.couple} sizes="(min-width: 900px) 70vw, 100vw" />
                <div className="film__veil" />
                <AnimatePresence mode="wait">
                  {playing && !hasFilm ? (
                    <motion.div key="note" className="film__note" role="status" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <p className="eyebrow eyebrow--light">Wedding film</p>
                      <p className="film__note-title">Premiering with the celebrations</p>
                      <p className="film__note-text">This is a portfolio demo, so no film is attached yet. Set <code>VITE_FILM_URL</code> to load a real video here.</p>
                      <button type="button" className="btn btn--light" onClick={() => setPlaying(false)}>
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button key="play" type="button" className="film__play" onClick={() => setPlaying(true)} aria-label="Play the wedding film" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileTap={{ scale: 0.95 }}>
                      <span className="film__ring" aria-hidden="true" />
                      <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
                        <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
                <div className="film__title">
                  <span>Aarav &amp; Siya</span>
                  <span>A Love Story</span>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
