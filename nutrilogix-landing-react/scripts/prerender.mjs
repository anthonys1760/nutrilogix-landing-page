import { build } from 'vite'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { SITE_ORIGIN, enrichHeadFromBlogPosting, extractBlogPosting, serializeHead } from '../src/seoHead.js'
import { getAllRoutes, getPostRoutes } from './routes.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')
const HEAD_RE = /<!--app-head-->[\s\S]*?<!--\/app-head-->/
const ROOT_RE = /<div id="root">[\s\S]*?<\/div>/

const MONTHS = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
}

function parseLastUpdated(html) {
  const match = html.match(/Last updated:\s*([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/)
  if (!match) return null
  const month = MONTHS[match[1].toLowerCase()]
  if (!month) return null
  return `${match[3]}-${month}-${match[2].padStart(2, '0')}`
}

function latestDate(dates) {
  return dates.filter(Boolean).sort().at(-1) || null
}

function pageHtml(template, html, head) {
  const headHtml = `<!--app-head-->\n    ${serializeHead(head)}\n    <!--/app-head-->`
  if (!HEAD_RE.test(template)) {
    throw new Error('Built index.html is missing <!--app-head--> markers')
  }
  if (!ROOT_RE.test(template)) {
    throw new Error('Built index.html is missing <div id="root">')
  }
  return template
    .replace(HEAD_RE, headHtml)
    .replace(ROOT_RE, `<div id="root">${html}</div>`)
}

function writeRoute(routePath, html) {
  if (routePath === '/') {
    writeFileSync(join(distDir, 'index.html'), html)
    return
  }
  const rel = routePath.replace(/^\//, '')
  const directory = join(distDir, rel)
  mkdirSync(directory, { recursive: true })
  writeFileSync(join(directory, 'index.html'), html)
  // GitHub Pages serves /path from path.html (200) and /path/ from path/index.html.
  // Emitting both avoids the directory-only 301 from /path to /path/.
  writeFileSync(join(distDir, `${rel}.html`), html)
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function renderSitemap(entries) {
  const urls = entries.map((entry) => {
    const lastmod = entry.lastmod ? `\n    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>` : ''
    return `  <url>\n    <loc>${xmlEscape(entry.loc)}</loc>${lastmod}\n  </url>`
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

const ssrOut = await build({
  root,
  configFile: join(root, 'vite.config.js'),
  logLevel: 'info',
  build: {
    ssr: join(root, 'src/entry-server.jsx'),
    outDir: ssrDir,
    emptyOutDir: true,
  },
})

const entryFile = ssrOut.output.find((item) => item.type === 'chunk' && item.isEntry)?.fileName
  || 'entry-server.js'
const { render } = await import(pathToFileURL(join(ssrDir, entryFile)).href)

const template = readFileSync(join(distDir, 'index.html'), 'utf8')
const routes = getAllRoutes()
const rendered = []

for (const route of routes) {
  let result
  try {
    result = render(route.path)
  } catch (error) {
    console.error(`Prerender failed for ${route.path}`)
    throw error
  }
  const posting = extractBlogPosting(result.html)
  const head = enrichHeadFromBlogPosting(result.head, posting)
  const html = pageHtml(template, result.html, head)
  writeRoute(route.path, html)
  rendered.push({ route, html, head, posting })
}

const samplePost = getPostRoutes().find((route) => (
  route.kind === 'generated' && !/[&<>"']/.test(route.post.title)
))
if (!samplePost) throw new Error('No plain-title generated post available for the trailing-slash check')
const slash = render(`${samplePost.path}/`)
if (!slash.html.includes(samplePost.post.title)) {
  throw new Error(`Trailing-slash route did not render ${samplePost.path}`)
}
const privacySlash = render('/privacy/')
if (!privacySlash.html.includes('Privacy Policy')) {
  throw new Error('Trailing-slash /privacy/ did not render the privacy page')
}

for (const item of rendered) {
  if (item.route.kind !== 'generated' && item.route.kind !== 'hardcoded') continue
  const published = item.posting?.datePublished
  if (!/^\d{4}-\d{2}-\d{2}$/.test(published || '')) {
    throw new Error(`Missing datePublished for ${item.route.path}`)
  }
  if (item.route.kind === 'generated' && published !== item.route.post.dateISO) {
    throw new Error(`datePublished ${published} does not match dateISO for ${item.route.path}`)
  }
}

const notFound = render('/this-page-does-not-exist')
const notFoundHead = enrichHeadFromBlogPosting(notFound.head, extractBlogPosting(notFound.html))
writeFileSync(join(distDir, '404.html'), pageHtml(template, notFound.html, notFoundHead))
writeFileSync(join(distDir, '.nojekyll'), '')

const postDates = rendered
  .filter((item) => item.route.kind === 'generated' || item.route.kind === 'hardcoded')
  .map((item) => item.posting?.datePublished || item.route.post?.dateISO)
  .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date || ''))
const newest = latestDate(postDates)

const sitemapEntries = rendered.map((item) => {
  let lastmod = null
  if (item.route.kind === 'generated') lastmod = item.route.post.dateISO
  else if (item.route.kind === 'hardcoded') lastmod = item.posting?.datePublished || null
  else if (item.route.id === 'privacy' || item.route.id === 'terms') lastmod = parseLastUpdated(item.html)
  else lastmod = newest
  if (!lastmod) throw new Error(`Missing sitemap lastmod for ${item.route.path}`)
  return {
    loc: `${SITE_ORIGIN}${item.route.path === '/' ? '/' : item.route.path}`,
    lastmod,
  }
})

writeFileSync(join(distDir, 'sitemap.xml'), renderSitemap(sitemapEntries))

const generatedCount = rendered.filter((item) => item.route.kind === 'generated').length
const hardcodedCount = rendered.filter((item) => item.route.kind === 'hardcoded').length
const pageCount = rendered.filter((item) => item.route.kind === 'page').length
console.log(`Prerendered ${rendered.length} routes (${pageCount} pages, ${generatedCount} generated posts, ${hardcodedCount} hardcoded posts)`)
console.log(`Sitemap URLs: ${sitemapEntries.length}`)
console.log('Wrote 404.html, sitemap.xml, and .nojekyll')

rmSync(ssrDir, { recursive: true, force: true })
