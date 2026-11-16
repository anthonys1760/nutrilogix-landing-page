import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generatedPosts } from '../src/data/generatedPosts.js'
import { staticPosts } from '../src/data/staticPosts.js'
import { isPublished } from '../src/isPublished.js'
import { blogPageCount, listPublishedPosts } from '../src/posts.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

export const STATIC_ROUTES = [
  { path: '/', id: 'home' },
  { path: '/blog', id: 'blog' },
  { path: '/privacy', id: 'privacy' },
  { path: '/terms', id: 'terms' },
]

export function hardcodedSlugs() {
  const src = readFileSync(join(root, 'src/pages/BlogPost.jsx'), 'utf8')
  return [...src.matchAll(/slug === '([^']+)'/g)].map((match) => match[1])
}

export function getPostRoutes() {
  const seen = new Set()
  const routes = []
  const staticBySlug = new Map(staticPosts.map((post) => [post.slug, post]))

  for (const post of generatedPosts) {
    if (!post.slug || seen.has(post.slug)) continue
    seen.add(post.slug)
    if (!isPublished(post)) continue
    routes.push({
      path: `/blog/${post.slug}`,
      kind: 'generated',
      post,
    })
  }

  for (const slug of hardcodedSlugs()) {
    if (seen.has(slug)) continue
    seen.add(slug)
    const listed = staticBySlug.get(slug)
    if (listed && !isPublished(listed)) continue
    routes.push({
      path: `/blog/${slug}`,
      kind: 'hardcoded',
      slug,
      post: listed,
    })
  }

  return routes
}

export function getBlogPageRoutes() {
  const pages = blogPageCount(listPublishedPosts().length)
  const routes = []
  for (let page = 2; page <= pages; page += 1) {
    routes.push({ path: `/blog/page/${page}`, id: `blog-page-${page}`, kind: 'page' })
  }
  return routes
}

export function getAllRoutes() {
  return [
    ...STATIC_ROUTES.map((route) => ({ ...route, kind: 'page' })),
    ...getBlogPageRoutes(),
    ...getPostRoutes(),
  ]
}
