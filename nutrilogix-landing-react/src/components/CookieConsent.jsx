import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setIsVisible(true)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('cookie-bar-open', isVisible)
    return () => document.documentElement.classList.remove('cookie-bar-open')
  }, [isVisible])

  const choose = (value) => {
    localStorage.setItem('cookie-consent', value)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="cookie-bar" role="dialog" aria-label="Cookie consent">
      <p>
        We use cookies for analytics.{' '}
        <Link to="/privacy">Privacy</Link>
      </p>
      <button type="button" className="cookie-btn cookie-decline" onClick={() => choose('declined')}>
        Decline
      </button>
      <button type="button" className="cookie-btn cookie-accept" onClick={() => choose('accepted')}>
        Accept
      </button>
    </div>
  )
}
