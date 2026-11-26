import { useEffect } from 'react'

export function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}
