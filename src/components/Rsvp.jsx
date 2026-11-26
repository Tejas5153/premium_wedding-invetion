import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config } from '../config'
import { submitRsvp } from '../lib/api'
import { Reveal, SectionHeading, EASE } from './Reveal'
import { Flower } from './Ornaments'
import './Forms.css'

const initial = { name: '', attending: '', guests: 1, message: '' }

export default function Rsvp() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [persisted, setPersisted] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    if (!form.attending) next.attending = 'Please let us know if you can join.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate() || status === 'sending') return
    setStatus('sending')
    try {
      const res = await submitRsvp({
        name: form.name.trim(),
        attending: form.attending === 'yes',
        guests: form.attending === 'yes' ? Number(form.guests) : 0,
        message: form.message.trim(),
      })
      setPersisted(res.persisted)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setForm(initial)
    setErrors({})
    setStatus('idle')
  }

  const attending = form.attending === 'yes'

  return (
    <section className="section form-section rsvp" id="rsvp" aria-labelledby="rsvp-title">
      <Flower className="rsvp__flower" petals={10} />
      <div className="container container--narrow">
        <SectionHeading id="rsvp-title" eyebrow="RSVP" title={<>Will you <em>join us?</em></>}>
          Kindly respond by 1 December 2026.
        </SectionHeading>

        <Reveal className="paper">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'done' ? (
              <motion.div key="done" className="thanks" role="status" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: EASE }}>
                <svg className="thanks__mark" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                  <motion.circle cx="40" cy="40" r="36" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: EASE }} />
                  <motion.path d="M24 41 L35 52 L57 29" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.9, ease: EASE }} />
                </svg>
                <h3>{attending ? `We can’t wait to celebrate with you, ${form.name.split(' ')[0]}` : `You will be missed, ${form.name.split(' ')[0]}`}</h3>
                <p>{attending ? `We’ve noted ${form.guests} ${Number(form.guests) === 1 ? 'guest' : 'guests'} for the celebrations.` : 'Thank you for letting us know — you will be in our hearts on the day.'}</p>
                {persisted ? (
                  <p className="notice notice--ok">Your response has been sent to the couple.</p>
                ) : (
                  <p className="notice">
                    <strong>Demo mode:</strong> this response was not sent or stored anywhere. Connect an RSVP endpoint to collect real replies.
                  </p>
                )}
                <button type="button" className="link-gold" onClick={reset}>
                  Submit another response
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className={`field${errors.name ? ' has-error' : ''}`}>
                  <label htmlFor="rsvp-name">Your name</label>
                  <input id="rsvp-name" name="name" type="text" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'rsvp-name-err' : undefined} placeholder="Full name" />
                  {errors.name && (
                    <p className="field__err" id="rsvp-name-err">
                      {errors.name}
                    </p>
                  )}
                </div>

                <fieldset className={`field${errors.attending ? ' has-error' : ''}`}>
                  <legend>Will you attend?</legend>
                  <div className="choice">
                    <input type="radio" id="att-yes" name="attending" value="yes" checked={form.attending === 'yes'} onChange={set('attending')} />
                    <label htmlFor="att-yes">Joyfully attending</label>
                    <input type="radio" id="att-no" name="attending" value="no" checked={form.attending === 'no'} onChange={set('attending')} />
                    <label htmlFor="att-no">Regretfully declining</label>
                  </div>
                  {errors.attending && <p className="field__err">{errors.attending}</p>}
                </fieldset>

                <AnimatePresence initial={false}>
                  {attending && (
                    <motion.div className="field-wrap" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                      <div className="field">
                        <label htmlFor="rsvp-guests">Number of guests (including you)</label>
                        <div className="stepper">
                          <button type="button" onClick={() => setForm((f) => ({ ...f, guests: Math.max(1, Number(f.guests) - 1) }))} aria-label="Decrease guests" disabled={Number(form.guests) <= 1}>
                            −
                          </button>
                          <output id="rsvp-guests" aria-live="polite">
                            {form.guests}
                          </output>
                          <button type="button" onClick={() => setForm((f) => ({ ...f, guests: Math.min(8, Number(f.guests) + 1) }))} aria-label="Increase guests" disabled={Number(form.guests) >= 8}>
                            +
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="field">
                  <label htmlFor="rsvp-msg">
                    A note for the couple <span>(optional)</span>
                  </label>
                  <textarea id="rsvp-msg" rows="3" maxLength={400} value={form.message} onChange={set('message')} placeholder="Dietary needs, song requests, or a few kind words…" />
                </div>

                {status === 'error' && (
                  <p className="notice notice--err" role="alert">
                    Something went wrong sending your response. Please try again.
                  </p>
                )}

                <button type="submit" className="btn btn--solid form__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send response'}
                </button>

                {!config.rsvpEndpoint && <p className="form__demo">Demo mode — responses are not saved or sent anywhere.</p>}
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
