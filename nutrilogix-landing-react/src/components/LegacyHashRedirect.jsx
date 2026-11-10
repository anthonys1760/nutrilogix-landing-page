import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { legacyHashToPath } from '../legacyHash.js'

export default function LegacyHashRedirect() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const legacy = legacyHashToPath(window.location.hash)
    if (legacy) {
      navigate(legacy, { replace: true })
      return
    }
    if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
      navigate(
        `${location.pathname.replace(/\/+$/, '')}${location.search}${location.hash}`,
        { replace: true }
      )
    }
  }, [location, navigate])

  return null
}
