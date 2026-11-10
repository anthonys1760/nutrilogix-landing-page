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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="app-layout">
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