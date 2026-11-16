import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_ORIGIN } from '../src/seoHead.js'
import { FEATURED_SLUGS, listPublishedPosts, relatedPostsFor } from '../src/posts.js'
import { getAllRoutes } from './routes.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const failures = []

function fail(message) {
  failures.push(message)
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) walk(full, files)
    else files.push(full)
  }
  return files
}

function distExists(pathname) {
  if (pathname === '/') return true
  const rel = pathname.replace(/^\//, '')
  try {
    statSync(join(distDir, rel, 'index.html'))
    return true
  } catch {
    try {
      statSync(join(distDir, `${rel}.html`))
      return true
    } catch {
      try {
        statSync(join(distDir, rel))
        return true
      } catch {
        return false
      }
    }
  }
}

const htmlFiles = walk(distDir).filter((file) => extname(file) === '.html')
const hrefRe = /(?:href|src)="([^"]+)"/g

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const rel = file.slice(distDir.length + 1)
  let match = hrefRe.exec(html)
  while (match) {
    const href = match[1]
    match = hrefRe.exec(html)
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
      if (href.startsWith(SITE_ORIGIN)) {
        const path = href.slice(SITE_ORIGIN.length).split('?')[0] || '/'
        if (!distExists(path)) fail(`${rel} broken absolute link ${href}`)
      }
      continue
    }
    const path = href.split('?')[0].split('#')[0]
    if (!path.startsWith('/')) continue
    if (!distExists(path)) fail(`${rel} broken internal link ${href}`)
  }
}

const published = listPublishedPosts()
const blogIndex = readFileSync(join(distDir, 'blog/index.html'), 'utf8')
for (const post of published.slice(0, 12)) {
  if (!blogIndex.includes(`href="/blog/${post.slug}"`)) {
    fail(`blog index missing crawlable link to /blog/${post.slug}`)
  }
}
if (published.length > 12 && !blogIndex.includes('href="/blog/page/2"')) {
  fail('blog index missing crawlable pagination link to /blog/page/2')
}

const home = readFileSync(join(distDir, 'index.html'), 'utf8')
if (!home.includes('href="/blog"')) fail('homepage missing crawlable /blog link')
for (const slug of FEATURED_SLUGS) {
  if (!home.includes(`href="/blog/${slug}"`)) fail(`homepage missing featured link to /blog/${slug}`)
}

for (const route of getAllRoutes().filter((item) => item.kind === 'generated' || item.kind === 'hardcoded')) {
  const slug = route.post?.slug || route.slug
  const html = readFileSync(join(distDir, `blog/${slug}/index.html`), 'utf8')
  if (!html.includes('Related posts') && relatedPostsFor(slug).length > 0) {
    fail(`${slug} missing Related posts`)
  }
  if (!html.includes('href="/blog"')) fail(`${slug} missing link back to /blog`)
  if (html.includes('href="/blog/holiday-party-logging"')) {
    fail(`${slug} links to unpublished holiday-party-logging`)
  }
}

if (failures.length) {
  console.error(`Internal link check failed (${failures.length}):`)
  for (const message of failures) console.error(`- ${message}`)
  process.exit(1)
}

console.log(`Checked ${htmlFiles.length} HTML files and ${published.length} published posts for broken internal links`)
