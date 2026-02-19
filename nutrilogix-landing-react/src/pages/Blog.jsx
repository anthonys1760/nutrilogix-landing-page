import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function Blog() {
  return (
    <>
      <SEO 
        title="Nutrilogix Blog - Nutrition Science & AI Tech"
        description="Expert articles on nutrition tracking, AI food analysis, and healthy living tips."
      />
      {/* Blog Header */}
      <section className="section bg-light" style={{ paddingBottom: '40px' }}>
        <div className="container section-header">
          <h1>Nutrition & Health Insights</h1>
          <p>Discover articles about nutrition, healthy eating habits, and making the most of your food tracking journey.</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="features-grid"> {/* Reusing grid layout */}

            {/* New Post: Hidden Cost of Manual Logging */}
            <article className="feature-card" style={{ padding: 0, overflow: 'hidden' }}>
              <Link to="/blog/hidden-cost-manual-logging" style={{ display: 'block' }}>
                <img src="/assets/images/ai-blog-logging.jpg" alt="Manual Food Logging Frustration" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '24px' }}>
                  <span className="badge" style={{ marginBottom: '12px' }}>Nutrition Science</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>The Hidden Cost of Manual Food Logging</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Why manual logging kills your diet momentum and how AI photo tracking solves this completely.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div className="avatar" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>A</div>
                    <span>Dr. Alex Rivera • Feb 19, 2026 • 5 min read</span>
                  </div>
                </div>
              </Link>
            </article>

            {/* New Post: The End of Manual Logging */}
            <article className="feature-card" style={{ padding: 0, overflow: 'hidden' }}>
              <Link to="/blog/the-end-of-manual-logging" style={{ display: 'block' }}>
                <img src="/assets/images/ai-blog-logging.jpg" alt="AI Food Analysis" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '24px' }}>
                  <span className="badge" style={{ marginBottom: '12px' }}>Technology</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>The End of Manual Logging: Why AI is the Future</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Discover how computer vision is replacing tedious food logging with instant, accurate photo analysis.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div className="avatar" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>A</div>
                    <span>Dr. Alex Rivera • Jan 15, 2026 • 6 min read</span>
                  </div>
                </div>
              </Link>
            </article>

            {/* New Post: Science of Satiety */}
            <article className="feature-card" style={{ padding: 0, overflow: 'hidden' }}>
              <Link to="/blog/science-of-satiety" style={{ display: 'block' }}>
                <img src="/assets/images/salmon.jpg" alt="Science of Satiety" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '24px' }}>
                  <span className="badge" style={{ marginBottom: '12px' }}>Nutrition Science</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>The Science of Satiety: Why You're Always Hungry</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Understanding hunger hormones and how to structure meals to stay full longer.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div className="avatar" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>A</div>
                    <span>Dr. Alex Rivera • Feb 2, 2026 • 5 min read</span>
                  </div>
                </div>
              </Link>
            </article>

            {/* New Post: UPFs */}
            <article className="feature-card" style={{ padding: 0, overflow: 'hidden' }}>
              <Link to="/blog/hidden-dangers-ultra-processed" style={{ display: 'block' }}>
                <img src="/assets/images/processed-vs-whole.jpg" alt="Whole vs Processed Foods" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '24px' }}>
                  <span className="badge" style={{ marginBottom: '12px' }}>Health Science</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Hidden Dangers of Ultra-Processed Foods</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Why "real food" matters more than macros, and how AI helps you spot the difference.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div className="avatar" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>S</div>
                    <span>Dr. Sarah Miller • Feb 10, 2026 • 5 min read</span>
                  </div>
                </div>
              </Link>
            </article>

            {/* Post 1 */}
            <article className="feature-card" style={{ padding: 0, overflow: 'hidden' }}>
              <Link to="/blog/understanding-macros" style={{ display: 'block' }}>
                <img src="/assets/images/salmon.jpg" alt="Understanding Macros" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '24px' }}>
                  <span className="badge" style={{ marginBottom: '12px' }}>Nutrition Basics</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Understanding Macros: A Beginner's Guide</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Learn about the three main macronutrients - proteins, carbohydrates, and fats - and why they matter.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div className="avatar" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>S</div>
                    <span>Sarah Johnson • Jan 20, 2026 • 5 min read</span>
                  </div>
                </div>
              </Link>
            </article>

            {/* Post 2 */}
            <article className="feature-card" style={{ padding: 0, overflow: 'hidden' }}>
              <Link to="/blog/ai-in-nutrition" style={{ display: 'block' }}>
                <img src="/assets/images/veggies.jpg" alt="AI in Nutrition" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '24px' }}>
                  <span className="badge" style={{ marginBottom: '12px' }}>Technology</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>How AI is Revolutionizing Nutrition Tracking</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Discover how artificial intelligence is making it easier than ever to track your daily nutrition.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div className="avatar" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>M</div>
                    <span>Mike Chen • Feb 28, 2026 • 4 min read</span>
                  </div>
                </div>
              </Link>
            </article>

            {/* Post 3 */}
            <article className="feature-card" style={{ padding: 0, overflow: 'hidden' }}>
              <Link to="/blog/meal-planning" style={{ display: 'block' }}>
                <img src="/assets/images/egg.jpg" alt="Meal Planning" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '24px' }}>
                  <span className="badge" style={{ marginBottom: '12px' }}>Tips & Tricks</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>5 Simple Steps to Effective Meal Planning</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Master the art of meal planning with these practical tips that will save you time.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div className="avatar" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>E</div>
                    <span>Emily Davis • Mar 12, 2026 • 6 min read</span>
                  </div>
                </div>
              </Link>
            </article>

            {/* Post 4 */}
            <article className="feature-card" style={{ padding: 0, overflow: 'hidden' }}>
              <Link to="/blog/7-minute-meal-prep" style={{ display: 'block' }}>
                <img src="/assets/images/veggies.jpg" alt="7-Minute Meal Prep" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '24px' }}>
                  <span className="badge" style={{ marginBottom: '12px' }}>Meal Prep</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>7-Minute Meal Prep for Busy Professionals</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: '16px' }}>A plug-and-play protein + veg + smart carb system with AI photo tracking.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div className="avatar" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>S</div>
                    <span>Sarah Johnson • Mar 5, 2026 • 8 min read</span>
                  </div>
                </div>
              </Link>
            </article>

          </div>
        </div>
      </section>
    </>
  )
}