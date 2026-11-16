import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { formatPostDate } from '../formatDate'
import { PAGE_SIZE, blogPageCount, blogPagePath, listPublishedPosts } from '../posts'

function localImageSize(src) {
  if (typeof src !== 'string') return {}
  if (src.endsWith('/salmon.webp') || src.endsWith('/veggies.webp')) return { width: 1600, height: 1067 }
  if (src.endsWith('/egg.webp')) return { width: 1600, height: 1436 }
  return {}
}

export default function Blog() {
  const posts = useMemo(() => listPublishedPosts(), [])
  const topics = useMemo(() => {
    return [...new Set(posts.map((post) => post.category).filter(Boolean))].sort()
  }, [posts])
  const { pageNumber } = useParams()
  const [params] = useSearchParams()
  const topic = params.get('topic') || ''
  const queryPage = params.get('page')
  const requested = Number.parseInt(pageNumber || queryPage || '1', 10)
  const filtered = topic ? posts.filter((post) => post.category === topic) : posts
  const pageCount = blogPageCount(filtered.length)
  const page = Number.isFinite(requested) ? Math.min(Math.max(requested, 1), pageCount) : 1
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const redirectTo = (!pageNumber && queryPage && Number.parseInt(queryPage, 10) > 1)
    ? blogPagePath(page, topic)
    : (pageNumber === '1' ? blogPagePath(1, topic) : null)

  useEffect(() => {
    if (redirectTo) return
    if (!pageNumber && !params.get('topic')) return
    document.getElementById('blog-grid')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [page, topic, params, pageNumber, redirectTo])

  const title = page > 1
    ? `Nutrilogix Blog - Page ${page}`
    : 'Nutrilogix Blog - Nutrition Science & AI Tech'
  const description = page > 1
    ? `Page ${page} of Nutrilogix articles on nutrition tracking, AI food analysis, and healthy living.`
    : 'Expert articles on nutrition tracking, AI food analysis, and healthy living tips.'

  if (redirectTo) return <Navigate to={redirectTo} replace />

  return (
    <>
      <SEO
        title={title}
        description={description}
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
            <Link
              to={blogPagePath(1)}
              className={`topic-filter ${topic ? '' : 'is-active'}`}
              aria-current={!topic ? 'page' : undefined}
            >
              All
            </Link>
            {topics.map((name) => (
              <Link
                key={name}
                to={blogPagePath(1, name)}
                className={`topic-filter ${topic === name ? 'is-active' : ''}`}
                aria-current={topic === name ? 'page' : undefined}
              >
                {name}
              </Link>
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
              {page <= 1 ? (
                <span className="is-disabled">Previous</span>
              ) : (
                <Link to={blogPagePath(page - 1, topic)}>Previous</Link>
              )}
              {Array.from({ length: pageCount }, (_, index) => {
                const number = index + 1
                return (
                  <Link
                    key={number}
                    to={blogPagePath(number, topic)}
                    className={number === page ? 'is-active' : ''}
                    aria-current={number === page ? 'page' : undefined}
                  >
                    {number}
                  </Link>
                )
              })}
              {page >= pageCount ? (
                <span className="is-disabled">Next</span>
              ) : (
                <Link to={blogPagePath(page + 1, topic)}>Next</Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  )
}
