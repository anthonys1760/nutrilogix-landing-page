import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay to not annoy immediately
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      right: '24px',
      maxWidth: '600px',
      margin: '0 auto',
      background: 'var(--bg-card)',
      padding: '24px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      border: '1px solid var(--border-medium)',
      backdropFilter: 'blur(10px)'
    }}>
      <div>
        <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-main)' }}>🍪 Cookie Consent</h4>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          We use cookies to improve your experience and analyze site traffic. By continuing to use our site, you consent to our use of cookies.
          Read our <a href="/privacy" style={{ color: 'var(--primary)', fontWeight: 600 }}>Privacy Policy</a>.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button 
          onClick={acceptCookies}
          className="btn btn-primary"
          style={{
            padding: '10px 32px',
            fontSize: '0.95rem'
          }}
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
