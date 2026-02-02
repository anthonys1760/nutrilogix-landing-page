import React, { useEffect } from 'react';
import SEO from '../components/SEO';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Privacy Policy - Nutrilogix" 
        description="Privacy Policy for Nutrilogix application. Learn how we handle your data, including photo analysis and health information."
      />
      <div className="container page-content" style={{ padding: '120px 20px 80px', maxWidth: '800px' }}>
        <h1 style={{ marginBottom: '40px' }}>Privacy Policy</h1>
        <p className="last-updated" style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Last updated: February 2, 2026</p>

        <section style={{ marginBottom: '32px' }}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Nutrilogix ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2>2. Information We Collect</h2>
          <h3>2.1. Personal Data</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you register for the Application, such as your name, email address, and demographic information.
          </p>

          <h3>2.2. Health and Fitness Data</h3>
          <p>
            With your explicit permission, we access data from Apple HealthKit and Google Fit (such as steps, active energy, and workouts) to provide accurate calorie tracking and energy balance insights. 
            <strong>This data is never sold to third parties.</strong>
          </p>

          <h3>2.3. Image Data</h3>
          <p>
            Our app uses your camera to analyze food. Images are processed to identify ingredients and estimate portion sizes. 
            We may store these images anonymously to improve our AI models, but you can opt-out of this in the settings.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2>3. How We Use Your Information</h2>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            <li>To provide and maintain our Service.</li>
            <li>To provide personalized nutrition analysis and recommendations.</li>
            <li>To improve our AI algorithms (anonymized data only).</li>
            <li>To monitor the usage of our Service.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2>4. Data Security</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. 
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2>5. Contact Us</h2>
          <p>
            If you have questions or comments about this policy, you may email us at <a href="mailto:privacy@nutrilogix.app" style={{ color: 'var(--primary)' }}>privacy@nutrilogix.app</a>.
          </p>
        </section>
      </div>
    </>
  );
}
