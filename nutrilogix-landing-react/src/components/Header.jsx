import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    if (!isHome) return; // If not on home, regular Links will handle navigation
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="container nav-container">
        <Link to="/" className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/assets/images/2.jpg" alt="Nutrilogix" />
          <span>Nutri<span className="text-highlight">Logix</span></span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {isHome ? (
            <>
              <button onClick={() => scrollToSection('features')} className="nav-link">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="nav-link">How It Works</button>
            </>
          ) : (
            <>
              <Link to="/#features" className="nav-link">Features</Link>
              <Link to="/#how-it-works" className="nav-link">How It Works</Link>
            </>
          )}
          <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <a href="#signup" className="btn btn-primary nav-cta" onClick={() => scrollToSection('signup')}>Early Access</a>
        </nav>
      </div>
    </header>
  );
}
