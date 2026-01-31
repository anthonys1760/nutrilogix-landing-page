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
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#2D3436' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> Scan fridge ingredients in seconds
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#2D3436' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> Generate macro-friendly recipes
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', color: '#2D3436' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> Auto-create shopping lists
                </li>
              </ul>
            </div>

            <div className="kitchen-visual reveal reveal-delay-2" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="step-card" style={{ padding: '24px', width: '100%', maxWidth: '350px', position: 'relative', zIndex: 2, border: '1px solid #eee' }}>
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#636E72', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scanned Ingredients</span>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {['Chicken Breast', 'Spinach', 'Bell Peppers', 'Quinoa'].map(item => (
                      <span key={item} style={{ background: '#F0F2F5', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', color: '#2D3436' }}>{item}</span>
                    ))}
                  </div>
                </div>
                
                <div style={{ textAlign: 'center', padding: '16px 0', color: 'var(--primary)', fontSize: '1.5rem' }}>⬇</div>

                <div style={{ background: '#F9FAFB', borderRadius: '16px', padding: '16px', border: '1px solid #EAEAEA' }}>
                  <span style={{ fontSize: '0.85rem', color: '#0DC68B', fontWeight: 700 }}>AI Suggested Meal</span>
                  <h4 style={{ margin: '8px 0 4px', fontSize: '1.1rem' }}>Quinoa & Chicken Power Bowl</h4>
                  <p style={{ fontSize: '0.9rem', color: '#636E72', marginBottom: '12px' }}>With sautéed spinach and roasted peppers.</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#2D3436', background: 'white', padding: '8px 12px', borderRadius: '8px' }}>
                    <span>420 kcal</span>
                    <span>35g Protein</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Shopping Section */}
      <section className="section">
        <div className="container">
          <div className="hero-inner" style={{ alignItems: 'center' }}>
            <div className="shopping-visual reveal" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', order: window.innerWidth > 900 ? 0 : 1 }}>
              <div className="step-card" style={{ padding: '0', width: '100%', maxWidth: '320px', position: 'relative', zIndex: 2, overflow: 'hidden', border: '1px solid #eee' }}>
                <div style={{ background: '#0DC68B', padding: '20px', color: 'white' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Smart Grocery List</h4>
                  <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: '0.85rem' }}>3 Recipes • 12 Items</p>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#636E72', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase' }}>Produce</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                      <div style={{ width: '20px', height: '20px', border: '2px solid #ddd', borderRadius: '6px' }}></div>
                      <span>Avocados (2)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                      <div style={{ width: '20px', height: '20px', background: '#E4F9F2', border: '2px solid #0DC68B', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0DC68B', fontSize: '12px' }}>✓</div>
                      <span style={{ textDecoration: 'line-through', color: '#aaa' }}>Baby Spinach</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#636E72', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase' }}>Pantry</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
                      <div style={{ width: '20px', height: '20px', border: '2px solid #ddd', borderRadius: '6px' }}></div>
                      <span>Olive Oil</span>
                    </div>
                  </div>
                </div>
              </div>
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

            <div className="health-content reveal reveal-delay-2">
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
            <div className="fitness-content reveal">
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
            
            <div className="fitness-visual reveal reveal-delay-2" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <div className="section-header reveal">
            <h2>Three steps to <span className="text-highlight">success</span>.</h2>
          </div>
          <div className="steps-container">
            <div className="step-item reveal reveal-delay-1">
              <div className="step-image">
                <img src="/assets/images/analyze-food.png" alt="Snap a photo" />
                <div className="step-badge">1</div>
              </div>
              <h3>Snap</h3>
              <p>Take a quick photo of your breakfast, lunch, or dinner.</p>
            </div>
            <div className="step-item reveal reveal-delay-2">
              <div className="step-image">
                <img src="/assets/images/imagess.png" alt="AI Analysis" />
                <div className="step-badge">2</div>
              </div>
              <h3>Analyze</h3>
              <p>Watch as AI instantly breaks down calories and nutrients.</p>
            </div>
            <div className="step-item reveal reveal-delay-3">
              <div className="step-image">
                <img src="/assets/images/process-image.png" alt="Track Progress" />
                <div className="step-badge">3</div>
              </div>
              <h3>Thrive</h3>
              <p>Hit your goals and feel the difference in your energy.</p>
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
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'normal', marginBottom: '24px', color: '#444' }}>
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
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'normal', marginBottom: '24px', color: '#444' }}>
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
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'normal', marginBottom: '24px', color: '#444' }}>
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
              <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#2D3436' }}>How accurate is the AI calorie tracking?</h4>
              <p style={{ color: 'var(--text-muted)' }}>Our AI is trained on millions of food images and has a 95%+ accuracy rate for identifying foods and estimating portions. It's often more accurate than human estimation!</p>
            </div>
            
            <div className="feature-card reveal reveal-delay-2" style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#2D3436' }}>Do I need to weigh my food?</h4>
              <p style={{ color: 'var(--text-muted)' }}>No! That's the beauty of Nutrilogix. Our volumetric analysis estimates weight based on visual depth and reference points in the photo.</p>
            </div>
            
            <div className="feature-card reveal reveal-delay-3" style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#2D3436' }}>Does it work with Apple Health & Fitbit?</h4>
              <p style={{ color: 'var(--text-muted)' }}>Yes. We have 2-way sync with Apple Health and Google Fit, so your workouts automatically increase your calorie budget.</p>
            </div>
            
            <div className="feature-card reveal reveal-delay-1" style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#2D3436' }}>Is there a free version?</h4>
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