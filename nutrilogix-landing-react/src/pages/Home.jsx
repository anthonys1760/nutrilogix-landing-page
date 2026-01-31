import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="badge">🚀 Coming Soon to iOS & Android</span>
            <h1>Nutrition Tracking,<br />Reimagined with AI.</h1>
            <p className="hero-sub">
              Stop typing. Start snapping. Nutrilogix analyzes your food photos instantly to give you accurate calories, macros, and insights.
            </p>
            <div className="hero-actions">
              <a href="#signup" className="btn btn-primary">Get Early Access</a>
              <a href="#how-it-works" className="btn btn-secondary">See how it works</a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <strong>95%</strong>
                <span>Accuracy</span>
              </div>
              <div className="stat">
                <strong>1M+</strong>
                <span>Foods</span>
              </div>
              <div className="stat">
                <strong>0</strong>
                <span>Manual Entries</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="phone-mockup-wrapper">
              <img src="/assets/images/nutrionix.png" alt="Nutrilogix App Interface" className="phone-mockup" />
              <div className="floating-card card-1">
                <span className="emoji">🥑</span>
                <div className="text">
                  <strong>Healthy Fat</strong>
                  <span>Avocado Toast • 240 kcal</span>
                </div>
              </div>
              <div className="floating-card card-2">
                <span className="emoji">⚡️</span>
                <div className="text">
                  <strong>Protein Goal</strong>
                  <span>Hit 140g today!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section features-section">
        <div className="container">
          <div className="section-header">
            <h2>Everything you need to <span className="text-highlight">eat better</span>.</h2>
            <p>We combine advanced computer vision with simple design to make tracking effortless.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon-box">📸</div>
              <h3>Instant Photo Analysis</h3>
              <p>Just point your camera. Our AI identifies ingredients and portions in milliseconds.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box">📊</div>
              <h3>Smart Macro Targets</h3>
              <p>Dynamic goals that adjust based on your activity, weight, and progress.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box">🍎</div>
              <h3>Verified Database</h3>
              <p>Access millions of verified foods, from grocery staples to restaurant meals.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box">🥣</div>
              <h3>Meal Suggestions</h3>
              <p>Stuck? Get personalized meal ideas that fit your remaining macros perfectly.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box">⚡️</div>
              <h3>Barcode Scanner</h3>
              <p>Scan packaged goods instantly for 100% accurate logging.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box">📈</div>
              <h3>Progress Insights</h3>
              <p>Visualize your journey with beautiful charts and weekly reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Three steps to <span className="text-highlight">success</span>.</h2>
          </div>
          <div className="steps-container">
            <div className="step-item step-card">
              <div className="step-image">
                <img src="/assets/images/analyze-food.png" alt="Snap a photo" />
                <div className="step-badge">1</div>
              </div>
              <div className="step-content">
                <h3>Snap</h3>
                <p>Take a quick photo of your breakfast, lunch, or dinner.</p>
              </div>
            </div>
            <div className="step-item step-card">
              <div className="step-image">
                <img src="/assets/images/imagess.png" alt="AI Analysis" />
                <div className="step-badge">2</div>
              </div>
              <div className="step-content">
                <h3>Analyze</h3>
                <p>Watch as AI instantly breaks down calories and nutrients.</p>
              </div>
            </div>
            <div className="step-item step-card">
              <div className="step-image">
                <img src="/assets/images/process-image.png" alt="Track Progress" />
                <div className="step-badge">3</div>
              </div>
              <div className="step-content">
                <h3>Thrive</h3>
                <p>Hit your goals and feel the difference in your energy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Trusted by <span className="text-highlight">beta testers</span>.</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"I never tracked because it was too tedious. Nutrilogix changed that completely. It's actually fun."</p>
              <div className="user">
                <div className="avatar">S</div>
                <div>
                  <strong>Sarah J.</strong>
                  <span>Lost 15lbs</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"The AI is scary good. It recognized my homemade lasagna ingredients perfectly."</p>
              <div className="user">
                <div className="avatar">M</div>
                <div>
                  <strong>Mike R.</strong>
                  <span>Muscle Gain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Signup */}
      <section id="signup" className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              <h2>Ready to transform your nutrition?</h2>
              <p>Join thousands of others on the waitlist. Launching soon.</p>
              <form className="waitlist-form" action="https://formspree.io/f/xkgjdpyd" method="POST" target="_blank">
                <input type="email" name="email" placeholder="Enter your email..." required />
                <button type="submit" className="btn btn-white">Join Waitlist</button>
              </form>
              <p className="small-print">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}