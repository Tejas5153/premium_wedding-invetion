import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { demoBlessings } from '../data/content'
import { addMessage, loadMessages, guestbookIsRemote } from '../lib/api'
import { Reveal, SectionHeading, EASE } from './Reveal'
import './Forms.css'

function Blessing({ m, demo, index = 0 }) {
  return (
    <motion.blockquote
      className="bless"
      layout="position"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 2) * 0.1 }}
    >
      <span className="bless__mark" aria-hidden="true">
        “
      </span>
      <p>{m.message}</p>
      <footer>
        <cite>{m.name}</cite>
        {m.note && <span>{m.note}</span>}
        {demo && <em className="bless__tag">Demo message</em>}
      </footer>
    </motion.blockquote>
  )
}

export default function Guestbook() {
  const [mine, setMine] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [err, setErr] = useState('')
  const [sending, setSending] = useState(false)
  const [justSent, setJustSent] = useState(false)

  useEffect(() => {
    let alive = true
    loadMessages()
      .then((list) => alive && setMine(Array.isArray(list) ? list : []))
      .catch(() => alive && setLoadError(true))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      setErr('Please add your name and a few words.')
      return
    }
    setErr('')
    setSending(true)
    try {
      const saved = await addMessage({ name: name.trim(), message: message.trim() })
      setMine((list) => [saved, ...list])
      setName('')
      setMessage('')
      setJustSent(true)
      setTimeout(() => setJustSent(false), 4000)
    } catch {
      setErr('We couldn’t save your blessing. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section form-section guestbook" id="guestbook" aria-labelledby="gb-title">
      <div className="container container--narrow">
        <SectionHeading id="gb-title" eyebrow="Guestbook" title={<>Leave a <em>blessing</em></>}>
          Write a few words for Aarav and Siya — a memory, a wish, or a piece of advice for forever.
        </SectionHeading>

        <Reveal className="paper">
          <form onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="gb-name">Your name</label>
              <input id="gb-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder="Full name" />
            </div>
            <div className="field">
              <label htmlFor="gb-msg">Your blessing</label>
              <textarea id="gb-msg" rows="4" maxLength={500} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="With all my love…" />
              <span className="field__count" aria-hidden="true">
                {message.length}/500
              </span>
            </div>
            {err && (
              <p className="notice notice--err" role="alert">
                {err}
              </p>
            )}
            <button type="submit" className="btn btn--solid form__submit" disabled={sending}>
              {sending ? 'Saving…' : 'Share blessing'}
            </button>
            <p className="form__demo">
              {guestbookIsRemote
                ? 'Blessings are shared with the couple and other guests.'
                : 'Demo mode — blessings are saved only in this browser on this device. They are not sent to the couple or shown to other guests.'}
            </p>
            <p className="sr-only" role="status">
              {justSent ? 'Your blessing was added.' : ''}
            </p>
          </form>
        </Reveal>

        <div className="gb__lists">
          <AnimatePresence initial={false}>
            {(mine.length > 0 || loading) && (
              <motion.div key="mine" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="gb__sub">{guestbookIsRemote ? 'Guest blessings' : 'Your blessings (this device only)'}</h3>
                {loading && <p className="gb__hint">Loading blessings…</p>}
                <div className="gb__cols">
                  {mine.map((m, i) => (
                    <Blessing key={`${m.createdAt}-${i}`} m={m} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {loadError && <p className="notice notice--err">We couldn’t load saved blessings right now.</p>}

          <h3 className="gb__sub">Sample blessings</h3>
          <p className="gb__hint">These four messages are fictional demo content, shown to illustrate the design.</p>
          <div className="gb__cols">
            {demoBlessings.map((m, i) => (
              <Blessing key={m.name} m={m} demo index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
