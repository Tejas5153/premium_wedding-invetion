import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { story } from '../data/content'
import { SectionHeading, Reveal, EASE } from './Reveal'
import ParallaxImage from './ParallaxImage'
import './Story.css'

function Chapter({ item, index }) {
  const flip = index % 2 === 1
  return (
    <li className={`chapter${flip ? ' chapter--flip' : ''}`}>
      <span className="chapter__dot" aria-hidden="true" />
      <motion.figure
        className="chapter__media"
        initial={{ clipPath: 'inset(12% 12% 12% 12%)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.5, ease: EASE }}
      >
        <ParallaxImage src={item.image} alt={item.alt} speed={6} sizes="(min-width: 900px) 50vw, 100vw" className="chapter__img" />
      </motion.figure>

      <div className="chapter__text">
        <Reveal as="span" className="chapter__no" y={10}>
          {item.no}
        </Reveal>
        <Reveal as="p" className="eyebrow" delay={0.08} y={10}>
          {item.when}
        </Reveal>
        <Reveal as="h3" className="chapter__title" delay={0.15}>
          {item.title}
        </Reveal>
        <Reveal as="p" className="chapter__body" delay={0.25}>
          {item.text}
        </Reveal>
      </div>
    </li>
  )
}

export default function Story() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] })
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="section story" id="story" aria-labelledby="story-title">
      <div className="container">
        <SectionHeading id="story-title" eyebrow="Our story" title={<>How <em>we</em> began</>}>
          Four chapters, one beautiful beginning.
        </SectionHeading>

        <div className="story__wrap" ref={ref}>
          <div className="story__rail" aria-hidden="true">
            <motion.span className="story__rail-fill" style={{ scaleY: grow }} />
          </div>
          <ol className="story__list">
            {story.map((item, i) => (
              <Chapter key={item.no} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
