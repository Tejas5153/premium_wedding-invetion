// Hand-built line-art ornaments. All use currentColor so they inherit palette from context.

export function Flower({ className = '', petals = 8, style }) {
  const arr = Array.from({ length: petals }, (_, i) => (360 / petals) * i)
  return (
    <svg className={className} style={style} viewBox="-50 -50 100 100" fill="none" stroke="currentColor" strokeWidth="0.7" aria-hidden="true" focusable="false">
      {arr.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d="M0 -4 C 9 -14, 9 -34, 0 -46 C -9 -34, -9 -14, 0 -4 Z" />
          <path d="M0 -10 L0 -38" strokeOpacity="0.5" />
        </g>
      ))}
      {arr.map((a) => (
        <g key={`i${a}`} transform={`rotate(${a + 180 / petals})`}>
          <path d="M0 -4 C 4 -9, 4 -18, 0 -24 C -4 -18, -4 -9, 0 -4 Z" strokeOpacity="0.7" />
        </g>
      ))}
      <circle r="3" />
    </svg>
  )
}

export function Divider({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 240 24" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true" focusable="false">
      <path d="M0 12 H92" />
      <path d="M148 12 H240" />
      <path d="M120 3 L129 12 L120 21 L111 12 Z" />
      <circle cx="100" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="140" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <path d="M120 8 L124 12 L120 16 L116 12 Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Sprig({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 220" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M60 218 C 58 160, 66 100, 56 6" />
      {[30, 62, 96, 130, 164].map((y, i) => {
        const dir = i % 2 ? 1 : -1
        return (
          <g key={y} transform={`translate(${60 + dir * -2} ${y})`}>
            <path d={`M0 0 C ${dir * 18} -6, ${dir * 34} -4, ${dir * 44} -22 C ${dir * 28} -26, ${dir * 8} -18, 0 0 Z`} />
            <path d={`M0 0 L${dir * 36} -17`} strokeOpacity="0.5" />
          </g>
        )
      })}
      <circle cx="56" cy="8" r="4" />
    </svg>
  )
}
