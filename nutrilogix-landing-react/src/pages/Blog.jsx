import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { generatedPosts } from '../data/generatedPosts'
import { staticPosts } from '../data/staticPosts'
import { formatPostDate } from '../formatDate'
import { isPublished } from '../isPublished'

const PAGE_SIZE = 12

function localImageSize(src) {
  if (typeof src !== 'string') return {}
  if (src.endsWith('/salmon.webp') || src.endsWith('/veggies.webp')) return { width: 1600, height: 1067 }
  if (src.endsWith('/egg.webp')) return { width: 1600, height: 1436 }
  return {}
}

function allPosts() {
  const seen = new Set()
  const posts = []
  for (const post of generatedPosts) {
    if (!post.slug || seen.has(post.slug)) continue
    seen.add(post.slug)
    if (!isPublished(post)) continue
    posts.push({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      imageAlt: post.title,
      category: post.category,
      author: post.author,
      authorInitial: post.authorInitial,
      dateISO: post.dateISO,
      readTime: post.readTime,
    })
  }
  for (const post of staticPosts) {
    if (seen.has(post.slug)) continue
    seen.add(post.slug)
    if (!isPublished(post)) continue
    posts.push(post)
  }
  return posts.sort((a, b) => (b.dateISO || '').localeCompare(a.dateISO || '') || a.slug.localeCompare(b.slug))
}

export default function Blog() {
  const posts = useMemo(() => allPosts(), [])
  const topics = useMemo(() => {
    return [...new Set(posts.map((post) => post.category).filter(Boolean))].sort()
  }, [posts])
  const [params, setParams] = useSearchParams()
  const topic = params.get('topic') || ''
  const requested = Number.parseInt(params.get('page') || '1', 10)
  const filtered = topic ? posts.filter((post) => post.category === topic) : posts
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Number.isFinite(requested) ? Math.min(Math.max(requested, 1), pageCount) : 1
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    if (!params.get('page') && !params.get('topic')) return
    document.getElementById('blog-grid')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [page, topic, params])

  const setQuery = (nextPage, nextTopic) => {
    const next = {}
    if (nextTopic) next.topic = nextTopic
    if (nextPage > 1) next.page = String(nextPage)
    setParams(next)
  }

  return (
    <>
      <SEO
        title="Nutrilogix Blog - Nutrition Science & AI Tech"
        description="Expert articles on nutrition tracking, AI food analysis, and healthy living tips."
      />
      <section className="section bg-light" style={{ paddingBottom: '40px' }}>
        <div className="container section-header">
          <h1>Nutrition & Health Insights</h1>
          <p>Discover articles about nutrition, healthy eating habits, and making the most of your food tracking journey.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="topic-filters" role="group" aria-label="Filter posts by topic">
            <button
              type="button"
              className={`topic-filter ${topic ? '' : 'is-active'}`}
              aria-pressed={!topic}
              onClick={() => setQuery(1, '')}
            >
              All
            </button>
            {topics.map((name) => (
              <button
                key={name}
                type="button"
                className={`topic-filter ${topic === name ? 'is-active' : ''}`}
                aria-pressed={topic === name}
                onClick={() => setQuery(1, name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div id="blog-grid" className="features-grid">
            {visible.map((post) => (
              <article key={post.slug} className="feature-card" style={{ padding: 0, overflow: 'hidden' }}>
                <Link to={`/blog/${post.slug}`} style={{ display: 'block' }}>
                  <img src={post.image} alt={post.imageAlt || post.title} {...localImageSize(post.image)} loading="lazy" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '24px' }}>
                    <span className="badge" style={{ marginBottom: '12px' }}>{post.category}</span>
                    <h2 className="blog-card-title">{post.title}</h2>
                    <p style={{ fontSize: '0.95rem', marginBottom: '16px' }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <div className="avatar" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>{post.authorInitial}</div>
                      <span>{post.author} • {formatPostDate(post.dateISO)} • {post.readTime} read</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {pageCount > 1 && (
            <nav className="blog-pagination" aria-label="Blog pages">
              <button type="button" disabled={page <= 1} onClick={() => setQuery(page - 1, topic)}>
                Previous
              </button>
              {Array.from({ length: pageCount }, (_, index) => {
                const number = index + 1
                return (
                  <button
                    key={number}
                    type="button"
                    className={number === page ? 'is-active' : ''}
                    aria-current={number === page ? 'page' : undefined}
                    onClick={() => setQuery(number, topic)}
                  >
                    {number}
                  </button>
                )
              })}
              <button type="button" disabled={page >= pageCount} onClick={() => setQuery(page + 1, topic)}>
                Next
              </button>
            </nav>
          )}
        </div>
      </section>
    </>
  )
}
