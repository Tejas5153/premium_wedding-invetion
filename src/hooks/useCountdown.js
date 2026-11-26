import { useEffect, useState } from 'react'

export function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const total = Math.max(0, target.getTime() - now)
  const s = Math.floor(total / 1000)
  return {
    done: total === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}
