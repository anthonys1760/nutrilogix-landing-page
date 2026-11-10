import { useState } from 'react'
import { FORMSPREE_URL } from '../siteCopy'

export default function WaitlistForm() {
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function onSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('submitting')
    setErrorMessage('')
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok) {
        setStatus('success')
        form.reset()
        return
      }
      const detail = Array.isArray(data.errors)
        ? data.errors.map((item) => item.message).filter(Boolean).join(' ')
        : ''
      setStatus('error')
      setErrorMessage(detail || 'Something went wrong. Please try again.')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <p className="waitlist-status" role="status">
        You're on the list. We'll email you when Android is ready.
      </p>
    )
  }

  return (
    <form id="cta-form" className="waitlist-form" action={FORMSPREE_URL} method="POST" onSubmit={onSubmit}>
      <label className="visually-hidden" htmlFor="cta-email">Email for Android updates</label>
      <input
        id="cta-email"
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        autoComplete="email"
      />
      <button type="submit" className="btn btn-notify" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Notify me'}
      </button>
      {status === 'error' && (
        <p className="waitlist-status waitlist-error" role="alert">{errorMessage}</p>
      )}
      <p className="small-print">No spam. Android updates only.</p>
    </form>
  )
}
