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
          <a href="#" target="_blank" rel="noreferrer">Twitter</a>
          <a href="#" target="_blank" rel="noreferrer">Instagram</a>
          <a href="mailto:hello@nutrilogix.app">Contact</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nutrilogix. All rights reserved.</p>
      </div>
    </footer>
  );
}
