import React, { useEffect } from 'react';
import SEO from '../components/SEO';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Terms of Service - Nutrilogix" 
        description="Terms of Service for using the Nutrilogix application and website."
      />
      <div className="container page-content" style={{ padding: '120px 20px 80px', maxWidth: '800px' }}>
        <h1 style={{ marginBottom: '40px' }}>Terms of Service</h1>
        <p className="last-updated" style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Last updated: February 2, 2026</p>

        <section style={{ marginBottom: '32px' }}>
          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Nutrilogix ("we," "us" or "our"), 
            concerning your access to and use of the Nutrilogix application and website.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2>2. Medical Disclaimer</h2>
          <p>
            <strong>Nutrilogix is not a medical device.</strong> The Application provides information and insights for educational and informational purposes only. 
            It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2>3. User Representations</h2>
          <p>
            By using the Application, you represent and warrant that:
          </p>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You are not a minor in the jurisdiction in which you reside.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2>4. Subscriptions and Payments</h2>
          <p>
            Certain features of the Service may be available only with a paid subscription. You will be billed in advance on a recurring and periodic basis (such as monthly or annually), depending on the type of subscription plan you select.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2>5. Contact Us</h2>
          <p>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at <a href="mailto:support@nutrilogix.app" style={{ color: 'var(--primary)' }}>support@nutrilogix.app</a>.
          </p>
        </section>
      </div>
    </>
  );
}
