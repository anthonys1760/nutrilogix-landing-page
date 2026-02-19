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
            <a href="https://x.com/AiNutrilogix" target="_blank" rel="noopener noreferrer" title="Follow on X" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
              𝕏
            </a>
            <a href="https://www.instagram.com/nutrilogix_ai/" target="_blank" rel="noopener noreferrer" title="Follow on Instagram" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
              📷
            </a>
            <a href="https://www.facebook.com/profile.php?id=61588345081705" target="_blank" rel="noopener noreferrer" title="Like on Facebook" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
              f
            </a>
            <a href="https://bsky.app/profile/nutrilogix.bsky.social" target="_blank" rel="noopener noreferrer" title="Follow on Bluesky" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
              🦋
            </a>
            <a href="https://www.linkedin.com/in/nutrilogix-ai-5b19353b1/" target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
              💼
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
