import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import CookieConsent from './components/CookieConsent'
import LegacyHashRedirect from './components/LegacyHashRedirect'

function App() {
  const location = useLocation()
  const normalizedPath = location.pathname.length > 1
    ? location.pathname.replace(/\/+$/, '')
    : location.pathname
  const routeLocation = normalizedPath === location.pathname
    ? location
    : { ...location, pathname: normalizedPath }

  const [theme, setTheme] = useState(() => {
    if (typeof localStorage === 'undefined') return 'light'
    return localStorage.getItem('theme') || 'light'
  })

  const [bannerVisible, setBannerVisible] = useState(() => {
    if (typeof localStorage === 'undefined') return true
    return localStorage.getItem('announcement-banner-dismissed') !== 'true'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--banner-height',
      bannerVisible ? '44px' : '0px'
    )
  }, [bannerVisible])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const dismissBanner = () => {
    localStorage.setItem('announcement-banner-dismissed', 'true')
    setBannerVisible(false)
  }

  return (
    <div className="app-layout">
      {bannerVisible && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '44px',
          background: 'var(--primary)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1100, fontSize: '0.9rem', fontWeight: 600,
          gap: '8px', padding: '0 48px',
        }}>
          <span>🚀 TestFlight is Live — Limited Beta Spots Available.</span>
          <a href="https://testflight.apple.com/join/7tFSghHS" target="_blank" rel="noopener noreferrer"
            style={{ color: '#fff', textDecoration: 'underline', marginLeft: '6px' }}>
            Get Early Access →
          </a>
          <button onClick={dismissBanner} aria-label="Dismiss banner"
            style={{
              position: 'absolute', right: '16px',
              background: 'none', border: 'none', color: '#fff',
              fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1, padding: '4px 8px',
            }}>×</button>
        </div>
      )}
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        {typeof document !== 'undefined' && <LegacyHashRedirect />}
        <Routes location={routeLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

export default App