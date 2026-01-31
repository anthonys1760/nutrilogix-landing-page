import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToSection = (id) => {
    closeMenu();
    if (!isHome) return; 
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavItems = ({ mobile = false }) => (
    <>
      {isHome ? (
        <>
          <button onClick={() => scrollToSection('features')} className={`nav-link ${mobile ? 'mobile-link' : ''}`}>Features</button>
          <button onClick={() => scrollToSection('how-it-works')} className={`nav-link ${mobile ? 'mobile-link' : ''}`}>How It Works</button>
        </>
      ) : (
        <>
          <Link to="/#features" className={`nav-link ${mobile ? 'mobile-link' : ''}`} onClick={closeMenu}>Features</Link>
          <Link to="/#how-it-works" className={`nav-link ${mobile ? 'mobile-link' : ''}`} onClick={closeMenu}>How It Works</Link>
        </>
      )}
      <Link to="/blog" className={`nav-link ${mobile ? 'mobile-link' : ''}`} onClick={closeMenu}>Blog</Link>
      <a href="#signup" className={`btn btn-primary nav-cta ${mobile ? 'mobile-cta' : ''}`} onClick={() => scrollToSection('signup')}>Early Access</a>
    </>
  );

  return (
    <header className="site-header">
      <div className="container nav-container">
        {/* Logo */}
        <Link to="/" className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/assets/images/2.jpg" alt="Nutrilogix" />
          <span>Nutri<span className="text-highlight">Logix</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <NavItems />
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`mobile-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <NavItems mobile={true} />
        </div>
      </div>
    </header>
  );
}