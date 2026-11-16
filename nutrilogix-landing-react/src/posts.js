import { generatedPosts } from './data/generatedPosts.js'
import { staticPosts } from './data/staticPosts.js'
import { isPublished } from './isPublished.js'

export const PAGE_SIZE = 12

export const FEATURED_SLUGS = [
  'beta-glucan-oats-cholesterol-blood-sugar-science',
  'plant-protein-vs-animal-protein-muscle-science',
  'thermic-effect-of-food-metabolism',
  'hydration-metabolism-water-fat-loss',
]

function toCard(post) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    imageAlt: post.imageAlt || post.title,
    category: post.category,
    author: post.author,
    authorInitial: post.authorInitial,
    dateISO: post.dateISO,
    readTime: post.readTime,
    keywords: post.keywords,
  }
}

export function listPublishedPosts(now = new Date()) {
  const seen = new Set()
  const posts = []
  for (const post of generatedPosts) {
    if (!post.slug || seen.has(post.slug)) continue
    seen.add(post.slug)
    if (!isPublished(post, now)) continue
    posts.push(toCard(post))
  }
  for (const post of staticPosts) {
    if (seen.has(post.slug)) continue
    seen.add(post.slug)
    if (!isPublished(post, now)) continue
    posts.push(toCard(post))
  }
  return posts.sort((a, b) => (b.dateISO || '').localeCompare(a.dateISO || '') || a.slug.localeCompare(b.slug))
}

export function blogPageCount(total) {
  return Math.max(1, Math.ceil(total / PAGE_SIZE))
}

export function blogPagePath(page, topic = '') {
  const path = page > 1 ? `/blog/page/${page}` : '/blog'
  if (!topic) return path
  return `${path}?topic=${encodeURIComponent(topic)}`
}

export function keywordSet(post) {
  const raw = post?.keywords
  const parts = Array.isArray(raw)
    ? raw
    : typeof raw === 'string'
      ? raw.split(',')
      : []
  return new Set(parts.map((item) => String(item).trim().toLowerCase()).filter(Boolean))
}

/**
 * 2–3 related published posts: shared category/keywords first, then most recent.
 * Future-dated posts are excluded via listPublishedPosts.
 */
export function relatedPostsFor(slug, now = new Date()) {
  const posts = listPublishedPosts(now)
  const others = posts.filter((post) => post.slug !== slug)
  if (others.length === 0) return []

  const current = posts.find((post) => post.slug === slug)
  const recent = others
  if (!current) return recent.slice(0, 3)

  const tags = keywordSet(current)
  const ranked = others.map((post) => {
    let score = 0
    if (current.category && post.category === current.category) score += 10
    for (const tag of keywordSet(post)) {
      if (tags.has(tag)) score += 1
    }
    return { post, score }
  })
  ranked.sort((a, b) => (
    b.score - a.score
    || (b.post.dateISO || '').localeCompare(a.post.dateISO || '')
    || a.post.slug.localeCompare(b.post.slug)
  ))

  const picks = []
  const seen = new Set()
  for (const item of ranked) {
    if (item.score <= 0) break
    if (picks.length >= 3) break
    picks.push(item.post)
    seen.add(item.post.slug)
  }
  if (picks.length < 2) {
    for (const post of recent) {
      if (picks.length >= 3) break
      if (seen.has(post.slug)) continue
      picks.push(post)
      seen.add(post.slug)
    }
  }
  return picks.slice(0, 3)
}

export function featuredPosts(now = new Date()) {
  const posts = listPublishedPosts(now)
  const picks = []
  const seen = new Set()
  for (const slug of FEATURED_SLUGS) {
    const post = posts.find((item) => item.slug === slug)
    if (!post) continue
    picks.push(post)
    seen.add(post.slug)
  }
  for (const post of posts) {
    if (picks.length >= 4) break
    if (seen.has(post.slug)) continue
    picks.push(post)
    seen.add(post.slug)
  }
  return picks.slice(0, 4)
}
