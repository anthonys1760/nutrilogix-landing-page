import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found - Nutrilogix" />
      <div className="container" style={{ 
        minHeight: '70vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center',
        paddingTop: '100px'
      }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '16px' }}>404</h1>
        <h2 style={{ marginBottom: '24px' }}>Page Not Found</h2>
        <p style={{ maxWidth: '400px', color: 'var(--text-muted)', marginBottom: '32px' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </>
  );
}
