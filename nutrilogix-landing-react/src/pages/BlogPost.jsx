import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import SEO from '../components/SEO'

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

  if (slug === 'the-end-of-manual-logging') {
    const blogPostingLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'The End of Manual Logging: Why AI is the Future of Nutrition Tracking',
      description: 'Discover how AI and computer vision are replacing tedious manual food logging, making nutrition tracking faster, more accurate, and sustainable.',
      image: ['/assets/images/ai-blog-logging.jpg'],
      author: { '@type': 'Person', name: 'Dr. Alex Rivera' },
      publisher: {
        '@type': 'Organization',
        name: 'Nutrilogix',
        logo: { '@type': 'ImageObject', url: '/assets/images/2.jpg' },
      },
      datePublished: '2026-01-15',
      mainEntityOfPage: { '@type': 'WebPage', '@id': '/blog/the-end-of-manual-logging' },
    }

    return (
      <div style={contentStyle}>
        <SEO 
          title="The End of Manual Logging - Nutrilogix" 
          description="Discover how AI and computer vision are replacing tedious manual food logging, making nutrition tracking faster, more accurate, and sustainable."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
        />
        
        <img src="/assets/images/ai-blog-logging.jpg" alt="AI Food Analysis" style={imgStyle} />
        
        <div style={metaStyle}>
          <span className="badge">Technology</span>
          <span>January 15, 2026</span>
          <span>6 min read</span>
        </div>

        <h1 style={h1Style}>The End of Manual Logging: Why AI is the Future of Nutrition Tracking</h1>
        
        <div style={bodyStyle}>
          <p style={{marginBottom: '24px'}}>
            For decades, "tracking your macros" meant one thing: staring at a food label, searching a clunky database, estimating portion sizes, and manually typing numbers into an app. It was tedious, prone to error, and the #1 reason people quit their nutrition goals.
          </p>

          <p style={{marginBottom: '24px'}}>
            But the era of manual logging is over. <strong>Computer Vision</strong> and <strong>Generative AI</strong> have matured to the point where your phone camera can now "see" food just like you do—but with the nutritional precision of a lab technician.
          </p>

          <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px' }}>The Friction of Traditional Tracking</h2>
          <p style={{marginBottom: '24px'}}>
            Studies show that users underestimate their calorie intake by up to 30% when logging manually. Why? Because we are terrible at guessing portion sizes. Is that 4oz of chicken or 6oz? Is that tablespoon of oil or two?
          </p>
          <p style={{marginBottom: '24px'}}>
            Beyond accuracy, the sheer <em>friction</em> is a killer. Spending 15 minutes a day logging food feels like a part-time job. AI reduces this to seconds.
          </p>

          <div style={{ background: 'var(--primary-light)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--primary)', marginBottom: '32px' }}>
             <strong>The Nutrilogix Difference:</strong> We don't just match keywords. Our AI analyzes the visual texture, volume, and composition of your meal to calculate density and mass instantly.
          </div>

          <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px' }}>How AI "See's" Your Food</h2>
          <p style={{marginBottom: '24px'}}>
            When you snap a photo with Nutrilogix, a complex pipeline triggers in milliseconds:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
            <li style={{marginBottom: '12px'}}><strong>Segmentation:</strong> The AI separates the steak from the broccoli and the rice.</li>
            <li style={{marginBottom: '12px'}}><strong>Volumetric Analysis:</strong> It estimates the 3D volume of each item based on depth and reference points.</li>
            <li style={{marginBottom: '12px'}}><strong>Density Calculation:</strong> It identifies the food type (e.g., "Grilled Salmon") to apply the correct caloric density.</li>
          </ul>

          <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px' }}>Beyond Calories: Quality Scores</h2>
          <p style={{marginBottom: '24px'}}>
            The future isn't just about <em>how much</em> you eat, but <em>what</em> you eat. AI can detect processing levels, identifying ultra-processed foods vs. whole foods instantly. This empowers you to optimize for longevity, not just weight loss.
          </p>

          <div style={{ textAlign: 'center', margin: '60px 0' }}>
            <a href="/#signup" className="btn btn-primary">Experience the Future</a>
          </div>

          <p>
            Ready to stop typing and start living? <a href="/#signup" style={{color: 'var(--primary)', fontWeight: 600}}>Join the Nutrilogix waitlist</a> today.
          </p>
        </div>
      </div>
    )
  }

  if (slug === '7-minute-meal-prep') {
    return (
      <div style={contentStyle}>
        <SEO 
          title="7-Minute Meal Prep for Busy Professionals - Nutrilogix" 
          description="A quick meal prep system using protein, veg, and smart carbs, integrated with an AI photo app for instant macro tracking."
        />
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
        <SEO 
          title="How AI is Revolutionizing Nutrition Tracking - Nutrilogix" 
          description="Artificial Intelligence is transforming nutrition tracking. Learn how computer vision and machine learning make logging meals instant and accurate."
        />
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
      <SEO title="Post Not Found - Nutrilogix" description="The requested blog post could not be found." />
      <h1>Post Coming Soon</h1>
      <p>We are still migrating this content. Check back shortly!</p>
      <Link to="/blog" className="btn btn-secondary" style={{ marginTop: '20px' }}>Back to Blog</Link>
    </div>
  )
}