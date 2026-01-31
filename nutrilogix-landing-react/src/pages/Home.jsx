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
              Stop typing. Start snapping. Nutrilogix analyzes your food photos instantly and tracks your workouts to give you accurate calories, macros, and insights.
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
                <strong>100%</strong>
                <span>Automated</span>
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
              <div className="icon-box">🥬</div>
              <h3>Smart Kitchen</h3>
              <p>Scan your fridge to generate recipes instantly and auto-create shopping lists.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box">🏃‍♂️</div>
              <h3>Smart Workout Sync</h3>
              <p>Connect with Apple Health & Google Fit to automatically track calories burned.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box">📈</div>
              <h3>Progress & Weight</h3>
              <p>Track your weight history, body composition, and nutrition trends over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Score Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="hero-inner" style={{ alignItems: 'center' }}>
            <div className="health-visual" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="step-card" style={{ padding: '32px', width: '100%', maxWidth: '350px', position: 'relative', zIndex: 2 }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <span style={{ fontSize: '4rem', fontWeight: 800, color: '#0DC68B', lineHeight: 1 }}>92</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#2D3436' }}>Excellent Choice!</div>
                </div>
                
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                    <span style={{ color: '#636E72' }}>Nutrient Density</span>
                    <span style={{ color: '#0DC68B', fontWeight: 600 }}>High</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                    <span style={{ color: '#636E72' }}>Processing Level</span>
                    <span style={{ color: '#0DC68B', fontWeight: 600 }}>Minimally Processed</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span style={{ color: '#636E72' }}>Additives</span>
                    <span style={{ color: '#0DC68B', fontWeight: 600 }}>None Detected</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="health-content">
              <h2>Go beyond calories with <span className="text-highlight">Health Scores</span>.</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                Not all calories are created equal. Nutrilogix analyzes the quality of your food to help you make smarter choices, not just lighter ones.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#2D3436' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> Instant quality rating (0-100)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#2D3436' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> Processing level detection
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#2D3436' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> Inflammatory ingredient alerts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fitness Section */}
      <section className="section">
        <div className="container">
          <div className="hero-inner" style={{ alignItems: 'center' }}>
            <div className="fitness-content">
              <h2>Track the full picture: <span className="text-highlight">Energy In & Out</span>.</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                Nutrition is only half the equation. Nutrilogix syncs seamlessly with your favorite fitness apps to track your calorie burn and adjust your daily targets in real-time.
              </p>
              
              <div style={{ display: 'grid', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🔥</div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem' }}>Automatic Calorie Adjustments</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Your daily calorie budget increases automatically when you work out.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>⌚️</div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem' }}>Wearable Integration</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Works with Apple Watch, Fitbit, Garmin, and more via Apple Health & Google Fit.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fitness-visual" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(13, 198, 139, 0.1), transparent 70%)' }}></div>
              <div className="step-card" style={{ padding: '32px', width: '100%', maxWidth: '350px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Activity Summary</span>
                  <span style={{ background: '#E4F9F2', color: '#0DC68B', padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>Today</span>
                </div>
                
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#F9FAFB', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '1.5rem' }}>🏃</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Morning Run</div>
                        <div style={{ fontSize: '0.8rem', color: '#636E72' }}>5.2 km • 32 min</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: '#0DC68B' }}>+340 kcal</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#F9FAFB', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '1.5rem' }}>🏋️‍♀️</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Strength Training</div>
                        <div style={{ fontSize: '0.8rem', color: '#636E72' }}>Upper Body • 45 min</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: '#0DC68B' }}>+210 kcal</div>
                  </div>
                  
                  <div style={{ marginTop: '12px', borderTop: '1px solid #eee', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#636E72' }}>Weekly Energy & Expenditure</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>Tracked</span>
                  </div>
                  
                  <div style={{ marginTop: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#636E72', fontSize: '0.9rem' }}>Extra Calories Earned</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>550 kcal</span>
                  </div>
                </div>
              </div>
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