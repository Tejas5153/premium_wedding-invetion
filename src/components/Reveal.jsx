import { motion } from 'framer-motion'

const EASE = [0.22, 0.8, 0.24, 1]

// Scroll-triggered reveal. Reduced-motion users get opacity-only (via MotionConfig in App).
export function Reveal({ as = 'div', delay = 0, y = 28, amount = 0.25, className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({ eyebrow, title, children, id, light = false }) {
  return (
    <div className="heading" style={light ? { color: 'var(--ivory)' } : undefined}>
      <Reveal as="p" className="eyebrow" y={12}>
        {eyebrow}
      </Reveal>
      <Reveal as="h2" className="section-title" id={id} delay={0.1}>
        {title}
      </Reveal>
      {children && (
        <Reveal as="p" className="lede" delay={0.2} style={light ? { color: 'rgba(250,245,236,.75)' } : undefined}>
          {children}
        </Reveal>
      )}
    </div>
  )
}

export { EASE }
