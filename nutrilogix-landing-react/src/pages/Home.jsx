import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SEO from '../components/SEO'
import Icon from '../components/Icons'
import TestFlightButton, { AndroidNotifyLink } from '../components/TestFlightButton'
import WaitlistForm from '../components/WaitlistForm'
import { OFFER_LINE } from '../siteCopy'

export default function Home() {
  const location = useLocation();

  const scrollToSignup = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('signup');
    if (el) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    }
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
        description="Track calories by photo, scan your fridge for recipes, and sync workouts with Apple Health. Nutrilogix logs a meal in about 30 seconds, with no manual entry."
      />
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="badge offer-pill"><i className="offer-dot" aria-hidden="true" />{OFFER_LINE}</span>
            <h1>Snap your plate.<br /><span className="text-highlight">Get your macros.</span></h1>
            <p className="hero-sub">
              Take a photo or just say what you ate. Nutrilogix logs calories and macros in about 30 seconds, and syncs workouts from Apple Health.
            </p>
            <div className="hero-actions">
              <TestFlightButton />
              <p className="hero-cta-meta">Opens Apple’s TestFlight app</p>
              <AndroidNotifyLink onClick={scrollToSignup} />
            </div>
            <div className="hero-stats">
              <div className="stat">
                <strong>A photo</strong>
                <span>Instead of typing a meal</span>
              </div>
              <div className="stat">
                <strong>Open beta</strong>
                <span>iOS testers welcome</span>
              </div>
              <div className="stat">
                <strong>You can edit</strong>
                <span>Photo estimates, not a lab result</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="phone-mockup-wrapper">
              <img src="/assets/images/nutrionix.png" alt="Nutrilogix home screen showing calories eaten and protein, carbs, and fat" className="phone-mockup" />
              <div className="phone-fade" aria-hidden="true" />
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
              <div className="icon-box"><Icon name="camera" /></div>
              <h3>Instant Photo Analysis</h3>
              <p>Just point your camera. Our AI identifies ingredients and portions in milliseconds.</p>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="icon-box"><Icon name="chart" /></div>
              <h3>Smart Macro Targets</h3>
              <p>Dynamic goals that adjust based on your activity, weight, and progress.</p>
            </div>
            <div className="feature-card reveal reveal-delay-3">
              <div className="icon-box"><Icon name="apple" /></div>
              <h3>Verified Database</h3>
              <p>A broad food database, from grocery staples to restaurant meals.</p>
            </div>
            <div className="feature-card reveal reveal-delay-1">
              <div className="icon-box"><Icon name="leaf" /></div>
              <h3>Smart Kitchen</h3>
              <p>Scan your fridge to generate recipes instantly and auto-create shopping lists.</p>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="icon-box"><Icon name="activity" /></div>
              <h3>Smart Workout Sync</h3>
              <p>Connect with Apple Health & Google Fit to automatically track calories burned.</p>
            </div>
            <div className="feature-card reveal reveal-delay-3">
              <div className="icon-box"><Icon name="trending" /></div>
              <h3>Progress & Weight</h3>
              <p>Track your weight history, body composition, and nutrition trends over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2>Why <span className="text-highlight">AI logging</span> wins.</h2>
            <p>The old way was designed for machines, not humans.</p>
          </div>
          <div className="comparison-grid reveal reveal-delay-1">
            {/* Old Way */}
            <div style={{ background: 'var(--bg-light)', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>The Old Way</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>Manual entry</div>
                  <p style={{ fontSize: '0.95rem' }}>Typing every ingredient</p>
                </div>
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>Easy to guess wrong</div>
                  <p style={{ fontSize: '0.95rem' }}>Portions judged by eye</p>
                </div>
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>Easy to abandon</div>
                  <p style={{ fontSize: '0.95rem' }}>Tracking feels like a chore</p>
                </div>
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>Multiple steps</div>
                  <p style={{ fontSize: '0.95rem' }}>Search, select, adjust</p>
                </div>
              </div>
            </div>

            {/* VS Divider */}
            <div className="comparison-vs-divider" style={{ background: 'var(--bg-card)', padding: '40px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px', minWidth: '80px', borderLeft: '1px solid var(--border-subtle)', borderRight: '1px solid var(--border-subtle)' }}>
              <div className="divider-line" style={{ width: '1px', height: '60px', background: 'var(--border-subtle)' }}></div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-text)', textAlign: 'center' }}>vs</span>
              <div className="divider-line" style={{ width: '1px', height: '60px', background: 'var(--border-subtle)' }}></div>
            </div>

            {/* Nutrilogix Way */}
            <div style={{ background: 'var(--primary-light)', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '32px', textAlign: 'center', color: 'var(--green-text)' }}>The Nutrilogix Way</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ textAlign: 'center', color: 'var(--green-text)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--green-text)', marginBottom: '8px' }}>A quick photo</div>
                  <p style={{ fontSize: '0.95rem' }}>Snap the plate</p>
                </div>
                <div style={{ textAlign: 'center', color: 'var(--green-text)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--green-text)', marginBottom: '8px' }}>An estimate you can edit</div>
                  <p style={{ fontSize: '0.95rem' }}>Adjust before you save</p>
                </div>
                <div style={{ textAlign: 'center', color: 'var(--green-text)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--green-text)', marginBottom: '8px' }}>Built to be quick</div>
                  <p style={{ fontSize: '0.95rem' }}>So logging is easier to keep</p>
                </div>
                <div style={{ textAlign: 'center', color: 'var(--green-text)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--green-text)', marginBottom: '8px' }}>One photo</div>
                  <p style={{ fontSize: '0.95rem' }}>That's the log</p>
                </div>
              </div>
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
                  <span style={{ color: 'var(--green-text)', fontWeight: 800 }}>✓</span> Scan fridge ingredients in seconds
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--green-text)', fontWeight: 800 }}>✓</span> Generate macro-friendly recipes
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--green-text)', fontWeight: 800 }}>✓</span> Auto-create shopping lists
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
            <div className="shopping-visual reveal" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/images/smart-list.png" alt="Nutrilogix Smart List" style={{ width: '100%', maxWidth: '750px', height: 'auto', zIndex: 2 }} />
            </div>

            <div className="shopping-content reveal reveal-delay-2">
              <h2>Shop smarter with <span className="text-highlight">Auto-Lists</span>.</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                Never forget an ingredient again. Nutrilogix automatically builds your grocery list based on your meal plan and what's already in your fridge.
              </p>
              
              <div style={{ display: 'grid', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div className="icon-box icon-box-inline"><Icon name="cart" /></div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem' }}>Organized by Aisle</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Items are automatically sorted by category (Produce, Dairy, etc.) to save you time.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div className="icon-box icon-box-inline"><Icon name="spark" /></div>
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
            <div className="health-content reveal">
              <h2>Go beyond calories with <span className="text-highlight">Health Scores</span>.</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                Not all calories are created equal. Nutrilogix analyzes the quality of your food to help you make smarter choices, not just lighter ones.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--green-text)', fontWeight: 800 }}>✓</span> Instant quality rating (0-100)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--green-text)', fontWeight: 800 }}>✓</span> Processing level detection
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--green-text)', fontWeight: 800 }}>✓</span> Inflammatory ingredient alerts
                </li>
              </ul>
            </div>

            <div className="health-visual reveal reveal-delay-2" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/images/scores.png" alt="Nutrilogix Health Score" style={{ width: '100%', maxWidth: '750px', height: 'auto', zIndex: 2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Fitness Section */}
      <section className="section">
        <div className="container">
          <div className="hero-inner" style={{ alignItems: 'center' }}>
            <div className="fitness-visual reveal" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/images/expenditure.png" alt="Nutrilogix Weekly Energy Expenditure" style={{ width: '100%', maxWidth: '750px', height: 'auto', zIndex: 2 }} />
            </div>

            <div className="fitness-content reveal reveal-delay-2">
              <h2>Master your <span className="text-highlight">Energy Balance</span>.</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                Go beyond simple calorie counting. Nutrilogix visualizes your weekly energy expenditure vs. intake so you can understand your true progress at a glance.
              </p>
              
              <div style={{ display: 'grid', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div className="icon-box icon-box-inline"><Icon name="chart" /></div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem' }}>Weekly Burn vs. Consumed</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>See exactly how your active calories stack up against your nutrition intake.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div className="icon-box icon-box-inline"><Icon name="trending" /></div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem' }}>Net Energy Tracking</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Instantly view your calorie deficit or surplus to stay aligned with your goals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Logging Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="hero-inner" style={{ alignItems: 'center' }}>
            <div className="voice-content reveal">
              <h2>Log meals with your <span className="text-highlight">Voice</span>.</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                Can't snap a photo? Just tell Nutrilogix what you ate. Our AI understands natural speech and logs your meals instantly—perfect for busy moments or when you're on the go.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--green-text)', fontWeight: 800 }}>✓</span> "I had a chicken salad with avocado"
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--green-text)', fontWeight: 800 }}>✓</span> "Two eggs and toast for breakfast"
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--green-text)', fontWeight: 800 }}>✓</span> "Grande oat milk latte from Starbucks"
                </li>
              </ul>

              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <span className="mini-icon"><Icon name="mic" /></span> Natural language
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <span className="mini-icon"><Icon name="zap" /></span> Instant logging
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <span className="mini-icon"><Icon name="spark" /></span> Photo estimates you can edit
                </div>
              </div>
            </div>

            <div className="voice-visual reveal reveal-delay-2" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/images/voice-logging.png" alt="Nutrilogix Voice Logging" style={{ width: '100%', maxWidth: '750px', height: 'auto', zIndex: 2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2>Three steps to <span className="text-highlight">success</span>.</h2>
            <p>From snap to stats in seconds. Here's how Nutrilogix transforms your journey.</p>
          </div>

          <div className="steps-container">
            <div className="step-item reveal reveal-delay-1" style={{ textAlign: 'center' }}>
              <div className="step-number">1</div>
              <div className="step-image" style={{ marginBottom: '24px' }}>
                <img src="/assets/images/snap.webp" alt="Snap a photo" width="1024" height="1024" loading="lazy" style={{ width: '100%', maxWidth: '550px', height: 'auto', margin: '0 auto', display: 'block' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Snap</h3>
              <p style={{ color: 'var(--text-muted)' }}>Take a quick photo of your breakfast, lunch, or dinner.</p>
            </div>

            <div className="step-item reveal reveal-delay-2" style={{ textAlign: 'center' }}>
              <div className="step-number">2</div>
              <div className="step-image" style={{ marginBottom: '24px' }}>
                <img src="/assets/images/analyze.png" alt="AI Analysis" style={{ width: '100%', maxWidth: '550px', height: 'auto', margin: '0 auto', display: 'block' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Analyze</h3>
              <p style={{ color: 'var(--text-muted)' }}>Watch as AI instantly breaks down calories and nutrients.</p>
            </div>

            <div className="step-item reveal reveal-delay-3" style={{ textAlign: 'center' }}>
              <div className="step-number">3</div>
              <div className="step-image" style={{ marginBottom: '24px' }}>
                <img src="/assets/images/health-score.png" alt="Track Progress" style={{ width: '100%', maxWidth: '550px', height: 'auto', margin: '0 auto', display: 'block' }} />
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
            <p>Notes from early testers.</p>
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
          
          <div className="features-grid">
            <div className="feature-card reveal reveal-delay-1" style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-main)' }}>How accurate is the AI calorie tracking?</h4>
              <p style={{ color: 'var(--text-muted)' }}>The estimate comes from the photo. It is a guide you can correct, not a lab measurement. Mixed dishes and portion size are the hard cases, so you can adjust the log before you save it.</p>
            </div>
            
            <div className="feature-card reveal reveal-delay-2" style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-main)' }}>Do I need to weigh my food?</h4>
              <p style={{ color: 'var(--text-muted)' }}>No! That's the beauty of Nutrilogix. Our volumetric analysis estimates weight based on visual depth and reference points in the photo.</p>
            </div>
            
            <div className="feature-card reveal reveal-delay-3" style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-main)' }}>Does it work with Apple Health and Google Fit?</h4>
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
              <h2>Ready to log meals by photo?</h2>
              <p className="cta-offer">{OFFER_LINE}</p>
              <TestFlightButton />
              <h3 className="cta-android-heading">On Android?</h3>
              <p className="cta-android-copy">Leave your email and we’ll notify you when it opens.</p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}