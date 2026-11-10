import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { postRedirects } from '../src/data/postRedirects.js'
import { SITE_ORIGIN, canonicalUrl, extractBlogPosting } from '../src/seoHead.js'
import { getAllRoutes } from './routes.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const failures = []

function fail(message) {
  failures.push(message)
}

function readDist(rel) {
  return readFileSync(join(distDir, rel), 'utf8')
}

function exists(rel) {
  try {
    readDist(rel)
    return true
  } catch {
    return false
  }
}

function decode(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
}

function titleOf(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/)
  return match ? decode(match[1].trim()) : ''
}

function meta(html, attr, name) {
  const re = new RegExp(`<meta ${attr}="${name}" content="([\\s\\S]*?)"\\s*/>`)
  const match = html.match(re)
  return match ? decode(match[1]) : null
}

function canonical(html) {
  const match = html.match(/<link rel="canonical" href="([^"]+)"\s*\/?>/)
  return match ? decode(match[1]) : null
}

function h1(html) {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
  return match ? decode(match[1].replace(/<[^>]+>/g, '').trim()) : ''
}

const templateScript = readDist('index.html').match(/<script type="module"[^>]*src="([^"]+)"/)
if (!templateScript) fail('dist/index.html is missing the module script')
const scriptSrc = templateScript?.[1] || ''

const routes = getAllRoutes()
const expectedLocs = new Set(routes.map((route) => canonicalUrl(route.path)))

for (const route of routes) {
  const rel = route.path === '/' ? 'index.html' : `${route.path.replace(/^\//, '')}/index.html`
  const sibling = route.path === '/' ? null : `${route.path.replace(/^\//, '')}.html`
  if (!exists(rel)) {
    fail(`missing ${rel}`)
    continue
  }
  const html = readDist(rel)
  if (sibling) {
    if (!exists(sibling)) fail(`missing ${sibling}`)
    else if (readDist(sibling) !== html) fail(`${sibling} does not match ${rel}`)
  }
  if (!html.includes(scriptSrc)) fail(`${rel} is missing the client bundle script`)
  if (!html.includes('<div id="root">') || html.includes('<div id="root"></div>')) {
    fail(`${rel} has an empty root`)
  }

  const title = titleOf(html)
  const description = meta(html, 'name', 'description')
  const ogTitle = meta(html, 'property', 'og:title')
  const ogDescription = meta(html, 'property', 'og:description')
  const ogType = meta(html, 'property', 'og:type')
  const twitterTitle = meta(html, 'name', 'twitter:title')
  const twitterDescription = meta(html, 'name', 'twitter:description')
  const twitterCard = meta(html, 'name', 'twitter:card')
  const pageCanonical = canonical(html)
  const expectedCanonical = canonicalUrl(route.path)

  if (!title) fail(`${rel} missing title`)
  if (!description) fail(`${rel} missing description`)
  if (ogTitle !== title) fail(`${rel} og:title does not match title`)
  if (ogDescription !== description) fail(`${rel} og:description does not match description`)
  if (twitterTitle !== title) fail(`${rel} twitter:title does not match title`)
  if (twitterDescription !== description) fail(`${rel} twitter:description does not match description`)
  if (twitterCard !== 'summary_large_image') fail(`${rel} missing twitter:card`)
  if (pageCanonical !== expectedCanonical) {
    fail(`${rel} canonical ${pageCanonical} !== ${expectedCanonical}`)
  }
  if (meta(html, 'property', 'og:url') !== expectedCanonical) fail(`${rel} og:url mismatch`)
  if (meta(html, 'name', 'twitter:url') !== expectedCanonical) fail(`${rel} twitter:url mismatch`)

  if (route.kind === 'page') {
    if (ogType !== 'website') fail(`${rel} og:type should be website`)
    if (route.id === 'home') {
      if (title !== 'Nutrilogix - AI Nutrition Tracking & Smart Kitchen') fail('home title changed')
      if (!description.startsWith('Track calories by photo')) fail('home description changed')
    }
    if (route.id === 'blog') {
      if (title !== 'Nutrilogix Blog - Nutrition Science & AI Tech') fail('blog index title changed')
    }
    if (route.id === 'privacy' && !title.startsWith('Privacy Policy')) fail('privacy title missing')
    if (route.id === 'terms' && !title.startsWith('Terms of Service')) fail('terms title missing')
  } else {
    const posting = extractBlogPosting(html)
    if (!posting) fail(`${rel} missing BlogPosting JSON-LD`)
    if (ogType !== 'article') fail(`${rel} og:type should be article`)
    if (!posting?.headline) fail(`${rel} JSON-LD missing headline`)
    if (!posting?.datePublished) fail(`${rel} JSON-LD missing datePublished`)
    if (!/^\d{4}-\d{2}-\d{2}/.test(posting?.datePublished || '')) {
      fail(`${rel} datePublished is not a date: ${posting?.datePublished}`)
    }
    const authorName = typeof posting?.author === 'string' ? posting.author : posting?.author?.name
    if (!authorName) fail(`${rel} JSON-LD missing author`)
    if (meta(html, 'property', 'article:published_time') !== posting.datePublished) {
      fail(`${rel} article:published_time does not match JSON-LD`)
    }
    if (meta(html, 'property', 'article:author') !== authorName) {
      fail(`${rel} article:author does not match JSON-LD`)
    }
    if (!h1(html).includes(posting.headline) && titleOf(html).includes(posting.headline) === false) {
      if (!html.includes(posting.headline) && !html.includes(posting.headline.replace(/&/g, '&amp;'))) {
        fail(`${rel} rendered HTML does not include the headline`)
      }
    }
    if (route.kind === 'generated') {
      const expectedTitle = `${route.post.title} - Nutrilogix`
      if (title !== expectedTitle) fail(`${rel} title ${JSON.stringify(title)} !== ${JSON.stringify(expectedTitle)}`)
      if (description !== route.post.excerpt) fail(`${rel} description does not match excerpt`)
      if (posting.headline !== route.post.title) fail(`${rel} JSON-LD headline does not match post title`)
      if (posting.datePublished !== route.post.dateISO) fail(`${rel} JSON-LD datePublished does not match dateISO`)
      if (authorName !== route.post.author) fail(`${rel} JSON-LD author does not match post author`)
    }
  }
}

if (!exists('404.html')) fail('missing 404.html')
else {
  const notFound = readDist('404.html')
  if (!notFound.includes(scriptSrc)) fail('404.html is missing the client bundle')
  if (titleOf(notFound) !== 'Page Not Found - Nutrilogix') fail('404.html title mismatch')
  if (meta(notFound, 'name', 'robots') !== 'noindex') fail('404.html should be noindex')
  if (!notFound.includes('Page Not Found')) fail('404.html missing not-found content')
  if (canonical(notFound)) fail('404.html should not publish a canonical')
}

const sitemap = exists('sitemap.xml') ? readDist('sitemap.xml') : ''
if (!sitemap.startsWith('<?xml')) fail('sitemap.xml missing')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const locSet = new Set(locs)
if (locs.length !== locSet.size) fail('sitemap has duplicate locs')
for (const loc of expectedLocs) {
  if (!locSet.has(loc)) fail(`sitemap missing ${loc}`)
}
for (const loc of locSet) {
  if (!expectedLocs.has(loc)) fail(`sitemap has unexpected ${loc}`)
}
if (sitemap.includes('/this-page-does-not-exist')) fail('sitemap includes the 404 probe')

for (const [fromSlug, toSlug] of Object.entries(postRedirects)) {
  const rel = `blog/${fromSlug}/index.html`
  const sibling = `blog/${fromSlug}.html`
  const targetPath = `/blog/${toSlug}`
  const canonicalTarget = `${SITE_ORIGIN}${targetPath}`
  if (!exists(rel)) {
    fail(`missing redirect page ${rel}`)
  } else {
    const html = readDist(rel)
    if (!exists(sibling)) fail(`missing redirect page ${sibling}`)
    else if (readDist(sibling) !== html) fail(`${sibling} does not match ${rel}`)
    if (!html.includes(`<meta http-equiv="refresh" content="0; url=${targetPath}"`)) {
      fail(`${rel} missing meta refresh to ${targetPath}`)
    }
    if (!html.includes(`<link rel="canonical" href="${canonicalTarget}"`)) {
      fail(`${rel} missing canonical ${canonicalTarget}`)
    }
    if (!html.includes('<meta name="robots" content="noindex"')) fail(`${rel} missing noindex`)
    if (!html.includes(`location.replace(${JSON.stringify(targetPath)})`)) fail(`${rel} missing JS redirect`)
    if (!html.includes(`<a href="${targetPath}">`)) fail(`${rel} missing visible link`)
    if (html.includes('BlogPosting')) fail(`${rel} should be a redirect, not an article`)
  }
  if (sitemap.includes(`<loc>${SITE_ORIGIN}/blog/${fromSlug}</loc>`)) {
    fail(`sitemap still lists /blog/${fromSlug}`)
  }
  if (!sitemap.includes(`<loc>${canonicalTarget}</loc>`)) fail(`sitemap missing kept /blog/${toSlug}`)
}

for (const route of routes.filter((item) => item.kind === 'generated')) {
  const loc = canonicalUrl(route.path)
  const block = sitemap.split('<url>').find((part) => part.includes(`<loc>${loc}</loc>`))
  if (!block || !block.includes(`<lastmod>${route.post.dateISO}</lastmod>`)) {
    fail(`sitemap lastmod for ${loc} should be ${route.post.dateISO}`)
  }
}

const robots = exists('robots.txt') ? readDist('robots.txt') : ''
if (!robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) fail('robots.txt does not point at the sitemap')
const cname = exists('CNAME') ? readDist('CNAME').trim() : ''
if (cname !== 'nutrilogix-ai.com') fail(`CNAME is ${JSON.stringify(cname)}`)
if (!exists('.nojekyll')) fail('missing .nojekyll')

if (failures.length) {
  console.error(`Prerender verification failed (${failures.length}):`)
  for (const message of failures) console.error(`- ${message}`)
  process.exit(1)
}

console.log(`Verified ${routes.length} routes, sitemap (${locs.length} urls), 404.html, robots.txt, and CNAME`)
