import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import CookieConsent from './components/CookieConsent'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  const [bannerVisible, setBannerVisible] = useState(() => {
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
          <a href="https://apple.co/4alOAzW" target="_blank" rel="noopener noreferrer"
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
        <Routes>
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