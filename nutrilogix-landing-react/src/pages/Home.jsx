import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SEO from '../components/SEO'

export default function Home() {
  const location = useLocation();

  const scrollToSignup = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('signup');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.state?.scrollTo === 'signup') {
      // Small timeout to ensure page content is rendered before scrolling
      setTimeout(() => {
        scrollToSignup();
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO 
        title="Nutrilogix - AI Nutrition Tracking & Smart Kitchen"
        description="Track calories by photo, scan your fridge for recipes, and sync with Apple Health. No manual logging required."
      />
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content reveal">
            <span className="badge">🚀 Coming Soon to iOS & Android</span>
            <h1>Nutrition Tracking,<br />Reimagined with AI.</h1>
            <p className="hero-sub">
              Stop typing. Start snapping. Nutrilogix analyzes your food photos instantly and tracks your workouts to give you accurate calories, macros, and insights.
            </p>
            <div className="hero-actions">
              <button onClick={scrollToSignup} className="btn btn-primary">Get Early Access</button>
              <button onClick={scrollToSignup} className="btn btn-secondary">See how it works</button>
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
                <strong>No</strong>
                <span>Manual Logging</span>
              </div>
            </div>
          </div>
          <div className="hero-visual reveal reveal-delay-2">
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
          <div className="section-header reveal">
            <h2>Everything you need to <span className="text-highlight">eat better</span>.</h2>
            <p>We combine advanced computer vision with simple design to make tracking effortless.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card reveal reveal-delay-1">
              <div className="icon-box">📸</div>
              <h3>Instant Photo Analysis</h3>
              <p>Just point your camera. Our AI identifies ingredients and portions in milliseconds.</p>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="icon-box">📊</div>
              <h3>Smart Macro Targets</h3>
              <p>Dynamic goals that adjust based on your activity, weight, and progress.</p>
            </div>
            <div className="feature-card reveal reveal-delay-3">
              <div className="icon-box">🍎</div>
              <h3>Verified Database</h3>
              <p>Access millions of verified foods, from grocery staples to restaurant meals.</p>
            </div>
            <div className="feature-card reveal reveal-delay-1">
              <div className="icon-box">🥬</div>
              <h3>Smart Kitchen</h3>
              <p>Scan your fridge to generate recipes instantly and auto-create shopping lists.</p>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="icon-box">🏃‍♂️</div>
              <h3>Smart Workout Sync</h3>
              <p>Connect with Apple Health & Google Fit to automatically track calories burned.</p>
            </div>
            <div className="feature-card reveal reveal-delay-3">
              <div className="icon-box">📈</div>
              <h3>Progress & Weight</h3>
              <p>Track your weight history, body composition, and nutrition trends over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Kitchen Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="hero-inner" style={{ alignItems: 'center' }}>
            <div className="kitchen-content reveal">
              <h2>Your AI-powered <span className="text-highlight">Sous Chef</span>.</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                Don't know what to cook? Scan your fridge or pantry, and Nutrilogix will instantly generate recipes based on what you have—while keeping you on track with your macros.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> Scan fridge ingredients in seconds
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> Generate macro-friendly recipes
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> Auto-create shopping lists
                </li>
              </ul>
            </div>

            <div className="kitchen-visual reveal reveal-delay-2" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/images/fridge-scan.png" alt="Nutrilogix Fridge Scan" style={{ width: '100%', maxWidth: '750px', height: 'auto', zIndex: 2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Smart Shopping Section */}
      <section className="section">
        <div className="container">
          <div className="hero-inner" style={{ alignItems: 'center' }}>
            <div className="shopping-visual reveal" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', order: window.innerWidth > 900 ? 0 : 1 }}>
              <img src="/assets/images/smart-list.png" alt="Nutrilogix Smart List" style={{ width: '100%', maxWidth: '750px', height: 'auto', zIndex: 2 }} />
            </div>

            <div className="shopping-content reveal reveal-delay-2" style={{ order: window.innerWidth > 900 ? 1 : 0 }}>
              <h2>Shop smarter with <span className="text-highlight">Auto-Lists</span>.</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                Never forget an ingredient again. Nutrilogix automatically builds your grocery list based on your meal plan and what's already in your fridge.
              </p>
              
              <div style={{ display: 'grid', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🛒</div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem' }}>Organized by Aisle</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Items are automatically sorted by category (Produce, Dairy, etc.) to save you time.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🧠</div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem' }}>Waste Reduction AI</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>We check what you already have so you don't overbuy. Save money and food.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Score Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="hero-inner" style={{ alignItems: 'center' }}>
            <div className="health-visual reveal" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/images/scores.png" alt="Nutrilogix Health Score" style={{ width: '100%', maxWidth: '750px', height: 'auto', zIndex: 2 }} />
            </div>

            <div className="health-content reveal reveal-delay-2">
              <h2>Go beyond calories with <span className="text-highlight">Health Scores</span>.</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                Not all calories are created equal. Nutrilogix analyzes the quality of your food to help you make smarter choices, not just lighter ones.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> Instant quality rating (0-100)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> Processing level detection
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
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
            <div className="fitness-content reveal">
              <h2>Master your <span className="text-highlight">Energy Balance</span>.</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                Go beyond simple calorie counting. Nutrilogix visualizes your weekly energy expenditure vs. intake so you can understand your true progress at a glance.
              </p>
              
              <div style={{ display: 'grid', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>📊</div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem' }}>Weekly Burn vs. Consumed</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>See exactly how your active calories stack up against your nutrition intake.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>📉</div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem' }}>Net Energy Tracking</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Instantly view your calorie deficit or surplus to stay aligned with your goals.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fitness-visual reveal reveal-delay-2" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/images/expenditure.png" alt="Nutrilogix Weekly Energy Expenditure" style={{ width: '100%', maxWidth: '750px', height: 'auto', zIndex: 2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section bg-light">
        <div className="container">
          <div className="section-header reveal">
            <h2>Three steps to <span className="text-highlight">success</span>.</h2>
            <p>From snap to stats in seconds. Here's how Nutrilogix transforms your journey.</p>
          </div>

          <div className="steps-container">
            <div className="step-item reveal reveal-delay-1" style={{ textAlign: 'center' }}>
              <div className="step-image" style={{ marginBottom: '24px' }}>
                <img src="/assets/images/snap.png" alt="Snap a photo" style={{ width: '100%', maxWidth: '550px', height: 'auto', margin: '0 auto', display: 'block' }} />
                <div className="step-badge" style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', marginLeft: '-250px' }}>1</div>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Snap</h3>
              <p style={{ color: 'var(--text-muted)' }}>Take a quick photo of your breakfast, lunch, or dinner.</p>
            </div>

            <div className="step-item reveal reveal-delay-2" style={{ textAlign: 'center' }}>
              <div className="step-image" style={{ marginBottom: '24px' }}>
                <img src="/assets/images/analyze.png" alt="AI Analysis" style={{ width: '100%', maxWidth: '550px', height: 'auto', margin: '0 auto', display: 'block' }} />
                <div className="step-badge" style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', marginLeft: '-250px' }}>2</div>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Analyze</h3>
              <p style={{ color: 'var(--text-muted)' }}>Watch as AI instantly breaks down calories and nutrients.</p>
            </div>

            <div className="step-item reveal reveal-delay-3" style={{ textAlign: 'center' }}>
              <div className="step-image" style={{ marginBottom: '24px' }}>
                <img src="/assets/images/health-score.png" alt="Track Progress" style={{ width: '100%', maxWidth: '550px', height: 'auto', margin: '0 auto', display: 'block' }} />
                <div className="step-badge" style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', marginLeft: '-250px' }}>3</div>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Thrive</h3>
              <p style={{ color: 'var(--text-muted)' }}>Hit your goals and feel the difference in your energy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header reveal">
            <h2>Trusted by <span className="text-highlight">beta testers</span>.</h2>
            <p>Join over 1,000 early adopters who are already seeing results.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card reveal reveal-delay-1">
              <div style={{ color: '#FFD700', marginBottom: '16px', fontSize: '1.2rem' }}>★★★★★</div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'normal', marginBottom: '24px', color: 'var(--text-main)' }}>
                "I never tracked because it was too tedious. Nutrilogix changed that completely. Just snapping a photo makes logging meals fun rather than a chore."
              </p>
              <div className="user">
                <div className="avatar" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>S</div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)' }}>Sarah J.</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Lost 15lbs • Early Access</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card reveal reveal-delay-2">
              <div style={{ color: '#FFD700', marginBottom: '16px', fontSize: '1.2rem' }}>★★★★★</div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'normal', marginBottom: '24px', color: 'var(--text-main)' }}>
                "The AI is scary good. It recognized my complex homemade lasagna ingredients perfectly. The health score feature is a game changer for my diet quality."
              </p>
              <div className="user">
                <div className="avatar" style={{ background: '#E0E7FF', color: '#4F46E5' }}>M</div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)' }}>Mike R.</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Muscle Gain • Marathon Runner</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card reveal reveal-delay-3">
              <div style={{ color: '#FFD700', marginBottom: '16px', fontSize: '1.2rem' }}>★★★★★</div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'normal', marginBottom: '24px', color: 'var(--text-main)' }}>
                "The shopping list feature saves me hours every week. I love how it automatically checks my fridge before telling me what to buy. Incredible AI."
              </p>
              <div className="user">
                <div className="avatar" style={{ background: '#FEF3C7', color: '#D97706' }}>L</div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)' }}>Linda K.</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Busy Parent • Healthy Eater</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card reveal reveal-delay-1">
              <div style={{ color: '#FFD700', marginBottom: '16px', fontSize: '1.2rem' }}>★★★★★</div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'normal', marginBottom: '24px', color: 'var(--text-main)' }}>
                "Finally, an app that syncs correctly with Apple Health! My workout burn is instantly credited to my daily goals. It's the most seamless setup I've used."
              </p>
              <div className="user">
                <div className="avatar" style={{ background: '#DCFCE7', color: '#166534' }}>J</div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)' }}>James W.</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Crossfit Athlete • Techie</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card reveal reveal-delay-2">
              <div style={{ color: '#FFD700', marginBottom: '16px', fontSize: '1.2rem' }}>★★★★★</div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'normal', marginBottom: '24px', color: 'var(--text-main)' }}>
                "I was shocked at my favorite snacks' health scores. Nutrilogix has helped me cut out inflammatory foods I didn't even know I was eating. Worth every penny."
              </p>
              <div className="user">
                <div className="avatar" style={{ background: '#FCE7F3', color: '#9D174D' }}>E</div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)' }}>Emily S.</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Health Coach • Foodie</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card reveal reveal-delay-3">
              <div style={{ color: '#FFD700', marginBottom: '16px', fontSize: '1.2rem' }}>★★★★★</div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'normal', marginBottom: '24px', color: 'var(--text-main)' }}>
                "The speed is what got me. I can log an entire meal during a 30-second break between meetings. No searching, no typing, just a photo. It's brilliant engineering."
              </p>
              <div className="user">
                <div className="avatar" style={{ background: '#F3F4F6', color: '#374151' }}>D</div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)' }}>David L.</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Software Engineer • Busy Professional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header reveal">
            <h2>Frequently Asked <span className="text-highlight">Questions</span>.</h2>
          </div>
          
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
            <div className="feature-card reveal reveal-delay-1" style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-main)' }}>How accurate is the AI calorie tracking?</h4>
              <p style={{ color: 'var(--text-muted)' }}>Our AI is trained on millions of food images and has a 95%+ accuracy rate for identifying foods and estimating portions. It's often more accurate than human estimation!</p>
            </div>
            
            <div className="feature-card reveal reveal-delay-2" style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-main)' }}>Do I need to weigh my food?</h4>
              <p style={{ color: 'var(--text-muted)' }}>No! That's the beauty of Nutrilogix. Our volumetric analysis estimates weight based on visual depth and reference points in the photo.</p>
            </div>
            
            <div className="feature-card reveal reveal-delay-3" style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-main)' }}>Does it work with Apple Health & Fitbit?</h4>
              <p style={{ color: 'var(--text-muted)' }}>Yes. We have 2-way sync with Apple Health and Google Fit, so your workouts automatically increase your calorie budget.</p>
            </div>
            
            <div className="feature-card reveal reveal-delay-1" style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-main)' }}>Is there a free version?</h4>
              <p style={{ color: 'var(--text-muted)' }}>Yes, the core tracking features are free forever. Premium features like advanced Health Scores and Smart Shopping Lists are available with a subscription.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Signup */}
      <section id="signup" className="section cta-section reveal">
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