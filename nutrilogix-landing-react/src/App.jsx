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
  return (
    <div className="app-layout">
      <Header />
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