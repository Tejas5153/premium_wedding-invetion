import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gallery } from '../data/content'
import Picture from './Picture'
import { imageInfo } from '../data/images'
import { SectionHeading, EASE } from './Reveal'
import { useBodyLock } from '../hooks/useBodyLock'
import './Gallery.css'

function Lightbox({ index, onClose, onIndex }) {
  const closeRef = useRef(null)
  const dirRef = useRef(1)
  const item = gallery[index]

  const go = useCallback(
    (d) => {
      dirRef.current = d
      onIndex((index + d + gallery.length) % gallery.length)
    },
    [index, onIndex],
  )

  useBodyLock(true)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // Warm the cache for the neighbouring photos so swiping feels instant.
  useEffect(() => {
    ;[1, -1].forEach((d) => {
      const n = gallery[(index + d + gallery.length) % gallery.length]
      const pre = new Image()
      pre.sizes = '100vw'
      pre.srcset = imageInfo[n.src]?.srcSet ?? ''
      pre.src = n.src
    })
  }, [index])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  return (
    <motion.div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <button className="lb__backdrop" onClick={onClose} aria-label="Close photo viewer" tabIndex={-1} />
      <button ref={closeRef} className="lb__btn lb__close" onClick={onClose} aria-label="Close">
        <span aria-hidden="true">✕</span>
      </button>
      <button className="lb__btn lb__prev" onClick={() => go(-1)} aria-label="Previous photo">
        <span aria-hidden="true">←</span>
      </button>
      <button className="lb__btn lb__next" onClick={() => go(1)} aria-label="Next photo">
        <span aria-hidden="true">→</span>
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.figure
          key={item.id}
          className="lb__fig"
          initial={{ opacity: 0, x: 40 * dirRef.current, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -40 * dirRef.current, scale: 0.97 }}
          transition={{ duration: 0.4, ease: EASE }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) go(1)
            else if (info.offset.x > 70) go(-1)
          }}
        >
          <Picture src={item.src} alt={item.alt} sizes="(min-width: 1100px) 1100px, calc(100vw - 2rem)" priority draggable="false" />
          <figcaption>
            <span>{item.caption}</span>
            <span aria-hidden="true">
              {index + 1} / {gallery.length}
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const trigger = useRef(null)

  const show = (i, el) => {
    trigger.current = el
    setOpen(i)
  }
  const close = useCallback(() => {
    setOpen(null)
    trigger.current?.focus()
  }, [])

  return (
    <section className="section gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading id="gallery-title" eyebrow="Gallery" title={<>Moments, <em>framed</em></>}>
          A glimpse of the colours, textures and traditions that shape our celebration. Tap any photograph to view it full screen.
        </SectionHeading>

        <ul className="mosaic">
          {gallery.map((g, i) => (
            <motion.li
              key={g.id}
              className={`mosaic__item mosaic__item--${i + 1}`}
              initial={{ opacity: 0, y: 48, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.2, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <button type="button" onClick={(e) => show(i, e.currentTarget)} aria-label={`View photo: ${g.alt}`}>
                <Picture src={g.src} sizes="(min-width: 900px) 33vw, 50vw" />
                <span className="mosaic__cap" aria-hidden="true">
                  {g.caption}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onIndex={setOpen} />}</AnimatePresence>
    </section>
  )
}
