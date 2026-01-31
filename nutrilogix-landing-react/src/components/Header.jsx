import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
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
