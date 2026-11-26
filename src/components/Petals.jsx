import { useMemo } from 'react'
import './Petals.css'

// Deterministic pseudo-random so layout is stable between renders.
function rng(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/**
 * Lightweight CSS-only falling petals ("petal") or rising gold dust ("dust").
 * Only transform/opacity animate, so it stays on the compositor.
 */
export default function Petals({ count = 14, variant = 'petal' }) {
  const items = useMemo(() => {
    const r = rng(variant === 'petal' ? 42 : 7)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: r() * 100,
      size: variant === 'petal' ? 9 + r() * 12 : 2 + r() * 3,
      dur: 12 + r() * 14,
      delay: -r() * 24,
      drift: (r() - 0.5) * 160,
      spin: 180 + r() * 360,
      tone: Math.floor(r() * 3),
    }))
  }, [count, variant])

  return (
    <div className={`petals petals--${variant}`} aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.id}
          className={`petal tone-${p.tone}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: variant === 'petal' ? p.size * 1.35 : p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  )
}
