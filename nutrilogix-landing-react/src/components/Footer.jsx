import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="brand-logo footer-logo">
            <img src="/assets/images/2.jpg" alt="Nutrilogix" />
            <span>NutriLogix</span>
          </div>
          <p>AI-powered nutrition tracking that adapts to your lifestyle. Snap, track, and achieve your goals.</p>
        </div>

        <div className="footer-links-group">
          <h4>Product</h4>
          <Link to="/">Home</Link>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        <div className="footer-links-group">
          <h4>Resources</h4>
          <Link to="/blog">Blog</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>

        <div className="footer-links-group">
          <h4>Connect</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {/* X (Twitter) */}
            <a href="https://x.com/AiNutrilogix" target="_blank" rel="noopener noreferrer" title="Follow on X" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.165-6.75-5.91 6.75h-3.308l7.73-8.835L2.42 2.25h6.552l4.666 6.18 5.406-6.18zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/nutrilogix_ai/" target="_blank" rel="noopener noreferrer" title="Follow on Instagram" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61588345081705" target="_blank" rel="noopener noreferrer" title="Like on Facebook" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>

            {/* Bluesky */}
            <a href="https://bsky.app/profile/nutrilogix.bsky.social" target="_blank" rel="noopener noreferrer" title="Follow on Bluesky" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.595 2.453C9.203 1.097 11.861.5 12.5.5c.633 0 3.306.596 4.914 1.953 1.608 1.358 2.34 3.115 2.34 5.597 0 .968-.11 1.88-.322 2.737.47.216 1.057.568 1.568 1.054 1.234 1.162 1.87 2.813 1.87 5.159 0 2.725-.904 4.87-2.718 6.3-1.814 1.43-4.224 2.184-6.84 2.184-2.287 0-4.304-.537-6.092-1.706-1.788-1.17-2.77-2.744-3.232-4.675-.136-.577-.208-1.18-.208-1.782 0-1.27.144-2.51.426-3.712.083.186.172.368.262.546 1.367 2.688 3.37 4.152 5.77 4.152.98 0 1.838-.226 2.495-.686.658-.46 1.05-1.11 1.05-1.898 0-.65-.24-1.18-.645-1.618-.3-.3-.734-.58-1.19-.778.24-.74.357-1.522.357-2.325 0-1.887-.708-3.48-2.048-4.612-1.34-1.132-3.1-1.753-5.17-1.753-2.7 0-5.017 1.375-6.523 3.806-.27.44-.49.82-.66 1.131-.272-.82-.408-1.77-.408-2.825 0-2.482.732-4.239 2.34-5.597Z"/></svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/nutrilogix-ai-5b19353b1/" target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
            </a>
          </div>
          <a href="mailto:hello@nutrilogix.app">Contact</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nutrilogix. All rights reserved.</p>
      </div>
    </footer>
  );
}
