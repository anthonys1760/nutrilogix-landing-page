import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function BlogPost() {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Shared Styles for content
  const contentStyle = {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '0 20px',
  }

  const imgStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '24px',
    marginBottom: '40px'
  }

  const h1Style = {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    lineHeight: 1.2
  }

  const metaStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    color: 'var(--text-muted)',
    marginBottom: '32px',
    fontSize: '0.9rem'
  }

  const bodyStyle = {
    fontSize: '1.125rem',
    lineHeight: 1.8,
    color: '#374151'
  }

  if (slug === '7-minute-meal-prep') {
    return (
      <div style={contentStyle}>
        <img src="/assets/images/veggies.jpg" alt="7-Minute Meal Prep" style={imgStyle} />
        
        <div style={metaStyle}>
          <span className="badge">Meal Prep</span>
          <span>September 4, 2025</span>
          <span>8 min read</span>
        </div>

        <h1 style={h1Style}>7-Minute Meal Prep for Busy Professionals</h1>
        
        <div style={bodyStyle}>
          <p style={{marginBottom: '24px'}}>
            When your calendar is wall-to-wall, nutrition is the first habit to slip. This 7-minute meal prep system helps you assemble
            balanced meals—fast—without weighing food or counting every calorie. And with Nutrilogix’s AI photo analysis, you can
            <strong> snap a plate and get instant macros</strong>, so tracking stays effortless.
          </p>

          <div style={{ background: 'var(--primary-light)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--primary)', marginBottom: '32px' }}>
             The 7-minute formula: <strong>Protein + Veg + Smart Carb + Flavor</strong>. Build your plate using quick-cook or ready-to-eat
             staples, then snap a photo in the app to verify balance and get smart tweaks.
          </div>

          <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px' }}>The 7-Minute Framework</h2>
          <p style={{marginBottom: '24px'}}>
            Think in modules. Keep a few options from each bucket on hand so you can rotate meals without decision fatigue. Use hand portions
            as a visual guide, then let the app refine portions with photo analysis.
          </p>

          <h3 style={{ fontSize: '1.4rem', marginTop: '30px', marginBottom: '16px' }}>Protein (1–2 palms)</h3>
          <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
            <li>Rotisserie chicken, canned tuna/salmon, pre-cooked chicken strips</li>
            <li>Greek yogurt, cottage cheese, eggs (hard-boiled)</li>
            <li>Tofu/tempeh, pre-cooked lentils</li>
          </ul>

          <h3 style={{ fontSize: '1.4rem', marginTop: '30px', marginBottom: '16px' }}>Veg (2 fists)</h3>
          <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
            <li>Bagged salads, baby spinach/arugula, slaw mix</li>
            <li>Microwave steam-in-bag veggies (broccoli, green beans, mixed veg)</li>
            <li>Cherry tomatoes, cucumbers, pre-cut peppers</li>
          </ul>

          <div style={{ textAlign: 'center', margin: '60px 0' }}>
            <a href="/#signup" className="btn btn-primary">Start Tracking in Seconds</a>
          </div>

          <p>
            Ready to save time? <a href="/#signup" style={{color: 'var(--primary)', fontWeight: 600}}>Join early access</a> and let AI handle your tracking.
          </p>
        </div>
      </div>
    )
  }

  if (slug === 'ai-in-nutrition') {
    return (
      <div style={contentStyle}>
        <img src="/assets/images/veggies.jpg" alt="AI in Nutrition" style={imgStyle} />
        
        <div style={metaStyle}>
          <span className="badge">Technology</span>
          <span>March 18, 2025</span>
          <span>4 min read</span>
        </div>

        <h1 style={h1Style}>How AI is Revolutionizing Nutrition Tracking</h1>
        
        <div style={bodyStyle}>
          <p style={{marginBottom: '24px'}}>
            Artificial Intelligence is transforming the way we track and understand our nutrition. Gone are the days of manually logging every meal or scanning barcodes. The future of nutrition tracking is here, and it's powered by AI.
          </p>

          <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px' }}>The Power of Computer Vision</h2>
          <p style={{marginBottom: '24px'}}>
            Modern AI systems use advanced computer vision algorithms to recognize food items in photos. These systems can identify multiple food items, estimate portions, and even detect specific brands.
          </p>
        </div>
      </div>
    )
  }

  // Fallback for other posts (simplified for brevity of this task)
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h1>Post Coming Soon</h1>
      <p>We are still migrating this content. Check back shortly!</p>
      <Link to="/blog" className="btn btn-secondary" style={{ marginTop: '20px' }}>Back to Blog</Link>
    </div>
  )
}