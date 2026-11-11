#!/usr/bin/env node
/**
 * generate-blog-post.mjs
 *
 * Drafts one Nutrilogix blog post with xAI Grok and appends it to
 * src/data/generatedPosts.js. The weekly workflow commits that file on a
 * blog/<date>-<slug> branch and opens a pull request. This script never
 * pushes, and it never writes to master.
 *
 * Required env (live runs only):
 *   XAI_API_KEY — xAI API key (repository Actions secret)
 * Optional:
 *   BLOG_MODEL — defaults to grok-4.7
 *
 *   node scripts/generate-blog-post.mjs --dry-run
 *     Prints the chosen topic and the chat request. Does not call the API
 *     and does not need XAI_API_KEY.
 */

import { execFileSync } from 'node:child_process'
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generatedPosts } from '../src/data/generatedPosts.js'
import { postRedirects } from '../src/data/postRedirects.js'
import { staticPosts } from '../src/data/staticPosts.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DATA_FILE = path.join(ROOT, 'src/data/generatedPosts.js')

export const XAI_URL = 'https://api.x.ai/v1/chat/completions'
export const DEFAULT_MODEL = 'grok-4.7'
export const MAX_TOPIC_RETRIES = 3
export const AUTHOR = { name: 'Anthony Smith', initial: 'A' }
export const DISCLAIMER = 'This article is for general information only and is not medical advice.'

const CATEGORIES = new Set([
  'Nutrition Science',
  'Wellness Science',
  'Technology',
  'Meal Prep',
  'Tips & Tricks',
  'Health Science',
  'Nutrition Basics',
])

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'your', 'you',
  'how', 'what', 'why', 'is', 'are', 'with', 'vs', 'from', 'about', 'its', 'it',
  'that', 'this', 'into', 'by', 'at', 'as', 'be', 'more', 'than', 'behind',
  'when', 'who', 'their', 'them', 'our', 'we', 'can', 'not', 'but', 'if',
])

const SOURCE_HOST_SUFFIXES = [
  'nih.gov',
  'ncbi.nlm.nih.gov',
  'medlineplus.gov',
  'cdc.gov',
  'who.int',
  'usda.gov',
  'fda.gov',
  'hhs.gov',
  'nutrition.gov',
  'dietaryguidelines.gov',
  'foodsafety.gov',
  'myplate.gov',
  'health.gov',
  'cancer.gov',
  'nhs.uk',
  'nice.org.uk',
  'heart.org',
  'diabetes.org',
  'eatright.org',
  'mayoclinic.org',
  'harvard.edu',
]

const FALLBACK_IMAGES = [
  'photo-1498837167922-ddd27525d352',
  'photo-1543352634-99a5d50ae78e',
  'photo-1559757148-5c350d0d3c56',
  'photo-1505576399279-565b52d4ac71',
  'photo-1456513080510-7bf3a84b82f8',
  'photo-1494390248081-4e521a5940db',
]

const UNSPLASH_IMAGE = /^https:\/\/images\.unsplash\.com\/photo-\d+-[a-zA-Z0-9_-]+\?w=800&q=80$/
const BANNED_HEADING = /what the science actually says/i
const FICTIONAL_DOCTOR = /\bDr\.\s+[A-Z][a-z]+/
const UNSAFE_HTML = /<\s*\/?\s*script|javascript:|onerror\s*=|onload\s*=|<\s*iframe|<\s*object|<\s*embed/i

export const TOPIC_CATALOG = [
  {
    title: 'How to Read a Nutrition Facts Label',
    angle: 'Walk through serving size, added sugars, % Daily Value, and ingredient order using the FDA Nutrition Facts label. Practical and specific. A product mention is optional.',
  },
  {
    title: 'Added Sugar on the Label and Sugar in Fruit',
    angle: 'Explain the difference between added sugars and sugars that come packaged in whole fruit, using FDA or USDA definitions. No invented thresholds.',
  },
  {
    title: 'Frozen Vegetables Versus Fresh',
    angle: 'Compare frozen and fresh vegetables for nutrition and waste, based on USDA or another major health body. Skip product promotion unless storage advice makes logging relevant.',
  },
  {
    title: 'A Ten-Minute Walk After Eating',
    angle: 'Describe what a short walk after a meal does for blood sugar, citing NIH, PubMed, or a major health body. Do not invent step counts or calorie burns.',
  },
  {
    title: 'Steaming Vegetables Instead of Boiling Them',
    angle: 'Explain how wet-heat cooking changes water-soluble vitamins, without invented percentages. Cite a real government or major-health-body page.',
  },
  {
    title: 'Grocery Shopping on a Small Budget',
    angle: 'Practical ways to buy protein, produce, and staples on a tight budget. Use USDA or MyPlate guidance. Mention barcode lookup only if it helps compare packaged foods.',
  },
  {
    title: 'Lactose Intolerance and Everyday Dairy Swaps',
    angle: 'Explain lactose intolerance in plain language and list everyday food swaps. Cite NIDDK or another NIH page. Do not invent prevalence statistics.',
  },
  {
    title: 'Restaurant Portions and What a Serving Looks Like',
    angle: 'Contrast a restaurant plate with a labeled serving. Use USDA or FDA serving examples. Photo or voice logging can be one sentence if it helps the reader record the plate they actually ate.',
  },
  {
    title: 'Logging a Mixed Bowl Without a Kitchen Scale',
    angle: 'How to describe a mixed bowl or casserole well enough to track it when there is no scale. This is a natural place for one sentence on photo logging, voice logging, or barcode lookup. Do not claim the app measures grams by magic.',
  },
  {
    title: 'Cooking With Herbs to Use Less Salt',
    angle: 'Practical salt-reduction cooking using herbs, acids, and the Dietary Guidelines sodium advice. Cite CDC, FDA, or the Dietary Guidelines. No product pitch required.',
  },
  {
    title: 'Adding Beans Without a Sudden Fiber Jump',
    angle: 'How to add beans and other legumes gradually, including soaking and portion size. Cite USDA or a fiber fact sheet. Do not repeat a general fiber overview.',
  },
  {
    title: 'What Whole Grain Means on a Box',
    angle: 'Decode whole grain, multigrain, and "made with whole grains" using FDA or Whole Grains Council language only if you can cite a real page. Prefer FDA, USDA, or Dietary Guidelines.',
  },
  {
    title: 'Packing a Lunch That Survives a Workday',
    angle: 'Food-safety and practicality for packed lunches: keeping cold food cold, and building a lunch from ordinary staples. Cite FoodSafety.gov or USDA. Skip Thanksgiving leftovers.',
  },
  {
    title: 'Breakfast When the Morning Is Rushed',
    angle: 'A few breakfast patterns that include protein and produce when time is short. Cite MyPlate or the Dietary Guidelines. Do not turn it into a protein-timing or intermittent-fasting article.',
  },
  {
    title: 'Sodium on Menus When Eating Out',
    angle: 'How to read sodium on chain-restaurant menus and why it matters for blood pressure. Cite FDA menu labeling or CDC sodium pages. Do not write a general potassium article.',
  },
  {
    title: 'Canned Fish as a Weeknight Protein',
    angle: 'Practical use of canned fish: protein, shelf life, and mercury guidance from FDA or EPA. Do not retell the EPA/DHA biochemistry article.',
  },
]

export class BlogError extends Error {
  constructor(message, { retryable = true } = {}) {
    super(message)
    this.name = 'BlogError'
    this.retryable = retryable
  }
}

export function slugify(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
    .replace(/-$/g, '')
}

function stem(token) {
  if (token.length > 4 && token.endsWith('s') && !token.endsWith('ss')) return token.slice(0, -1)
  return token
}

export function tokens(text) {
  return [...new Set(
    String(text || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/[\s-]+/)
      .map(stem)
      .filter((token) => token && token.length > 2 && !STOP_WORDS.has(token)),
  )]
}

function jaccard(left, right) {
  if (left.length === 0 || right.length === 0) return 0
  const rightSet = new Set(right)
  let intersection = 0
  for (const token of left) if (rightSet.has(token)) intersection += 1
  const union = new Set([...left, ...right]).size
  return union === 0 ? 0 : intersection / union
}

function contentTokens(slug) {
  return tokens(String(slug || '').replace(/-/g, ' '))
}

function slugClose(left, right) {
  if (!left || !right) return false
  if (left === right) return true
  const leftParts = contentTokens(left)
  const rightParts = contentTokens(right)
  if (leftParts.length === 0 || rightParts.length === 0) return false
  const [shorter, longer] = leftParts.length <= rightParts.length
    ? [leftParts, rightParts]
    : [rightParts, leftParts]
  const longerSet = new Set(longer)
  const hits = shorter.filter((part) => longerSet.has(part)).length
  if (shorter.length >= 2 && hits / shorter.length >= 0.75 && hits >= 2) return true
  if (hits >= 3 && hits / shorter.length >= 0.6) return true
  const prefix = Math.min(2, shorter.length, longer.length)
  if (prefix >= 2 && shorter.slice(0, prefix).join('-') === longer.slice(0, prefix).join('-')) return true
  return false
}

export function findClash(candidate, existing) {
  const title = String(candidate.title || '')
  const slug = candidate.slug || slugify(title)
  const titleTokens = tokens(title)
  const slugTokens = contentTokens(slug)
  for (const item of existing) {
    const itemSlug = item.slug
    const itemTitleTokens = tokens(item.title || '')
    const itemSlugTokens = contentTokens(itemSlug)
    let reason = null
    if (slug && itemSlug && slug === itemSlug) reason = 'same slug'
    else if (slugClose(slug, itemSlug)) reason = 'similar slug'
    else if (title && item.title && title.toLowerCase() === String(item.title).toLowerCase()) reason = 'same title'
    else if (jaccard(titleTokens, itemTitleTokens) >= 0.5) reason = 'similar title'
    else if (jaccard(slugTokens, itemSlugTokens) >= 0.5) reason = 'similar slug words'
    else if (jaccard(titleTokens, itemSlugTokens) >= 0.55) reason = 'title matches an existing slug'
    else if (jaccard(slugTokens, itemTitleTokens) >= 0.55) reason = 'slug matches an existing title'
    if (reason) return { ...item, reason }
  }
  return null
}

function rankKind(kind) {
  if (kind === 'generated' || kind === 'static') return 4
  if (kind === 'pull-request') return 3
  if (kind === 'retired') return 2
  return 1
}

export function titleFromPullRequest(title) {
  return String(title || '')
    .replace(/^content\(blog\):\s*/i, '')
    .replace(/^add\s+/i, '')
    .replace(/^['"]|['"]$/g, '')
    .trim()
}

export function postsFromPullRequest(pullRequest) {
  const ref = String(pullRequest.headRefName || '').replace(/^refs\/heads\//, '')
  const rawTitle = String(pullRequest.title || '')
  const isBlog = ref.startsWith('blog/') || /^content\(blog\)/i.test(rawTitle)
  if (!isBlog) return []
  const items = []
  const title = titleFromPullRequest(rawTitle)
  if (title) {
    items.push({ slug: slugify(title), title, kind: 'pull-request' })
  }
  const dated = ref.match(/^blog\/\d{4}-\d{2}-\d{2}-(.+)$/)
  const slug = dated ? dated[1] : (ref.startsWith('blog/') ? ref.slice('blog/'.length) : '')
  if (slug) {
    items.push({
      slug,
      title: title || slug.replace(/-/g, ' '),
      kind: 'pull-request',
    })
  }
  return items
}

export function collectExisting({ generatedPosts: generated, staticPosts: publishedStatic, postRedirects: redirects, pullRequests }) {
  const bySlug = new Map()
  const add = (item) => {
    if (!item.slug) return
    const previous = bySlug.get(item.slug)
    if (!previous || rankKind(item.kind) > rankKind(previous.kind)) bySlug.set(item.slug, item)
  }
  for (const post of generated || []) add({ slug: post.slug, title: post.title, kind: 'generated' })
  for (const post of publishedStatic || []) add({ slug: post.slug, title: post.title, kind: 'static' })
  for (const [fromSlug, toSlug] of Object.entries(redirects || {})) {
    add({ slug: fromSlug, title: fromSlug.replace(/-/g, ' '), kind: 'retired' })
    add({ slug: toSlug, title: toSlug.replace(/-/g, ' '), kind: 'redirect-target' })
  }
  for (const pullRequest of pullRequests || []) {
    for (const item of postsFromPullRequest(pullRequest)) add(item)
  }
  return [...bySlug.values()]
}

export function weekIndex(date, length) {
  if (length <= 0) return 0
  const utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  const start = Date.UTC(date.getUTCFullYear(), 0, 1)
  const day = Math.floor((utc - start) / 86400000)
  return Math.floor(day / 7) % length
}

export function chooseTopic(catalog, existing, { now = new Date(), excludeSlugs = [] } = {}) {
  const skipped = []
  const available = []
  const excluded = new Set(excludeSlugs)
  for (const topic of catalog) {
    const slug = slugify(topic.title)
    const clash = findClash({ title: topic.title, slug }, existing)
    if (clash || excluded.has(slug)) skipped.push({ topic, slug, clash })
    else available.push({ ...topic, slug })
  }
  if (available.length === 0) return { topic: null, skipped, alternatives: [] }
  const start = weekIndex(now, available.length)
  const ordered = available.slice(start).concat(available.slice(0, start))
  return { topic: ordered[0], skipped, alternatives: ordered.slice(1) }
}

function blocklistText(existing) {
  return existing.map((item) => {
    if (item.kind === 'retired') return `- retired slug: ${item.slug}`
    return `- ${item.title} (slug: ${item.slug})`
  }).join('\n')
}

export function buildMessages(topic, existing) {
  const system = `You write nutrition articles for Nutrilogix, a food-tracking app. The byline is ${AUTHOR.name}. Do not invent doctors, dietitians, researchers, credentials, or quotations. Never write "Dr. ${AUTHOR.name}" and never add MD, RD, PhD, or any other credential to the byline. Do not introduce a fictional expert.

Do not invent statistics, sample sizes, percentages, study names, journal citations, or quotes. If you are not sure a number is on the page you are citing, leave the number out and describe the finding in words.

Every health claim must be backed by a real page from NIH (including PubMed and MedlinePlus), CDC, WHO, USDA, FDA, NHS, or another major public health body. Put those citations only in the sources array, each as a string that includes the organization, the page title, and a full https URL. Use at least two sources. Do not cite blogs, news writeups, or supplement brands.

Add this exact sentence as its own paragraph immediately before the cta block: "${DISCLAIMER}"

Do not use the section heading "What the Science Actually Says", or a heading that only promises "what the science says". Name the specific idea.

The hero image must be a direct Unsplash URL in this exact shape: https://images.unsplash.com/photo-NUMERICID-HEX?w=800&q=80
Use a real photo id. One inline image block, if you include one, must use a different id in the same shape.

Mention Nutrilogix only when it helps the reader with the specific task in the article. The only features you may name are photo meal logging, voice meal logging, barcode lookup, and Apple Health sync. One sentence is enough. If none of those fits, do not mention the product.

Respond with one JSON object and no markdown.`

  const user = `Write a new article on this topic only:
Title: ${topic.title}
Angle: ${topic.angle}

Do not reuse or lightly reword any of these published, retired, or in-review topics:
${blocklistText(existing)}

Use this JSON shape:
{
  "title": "A specific title close to the assigned topic",
  "excerpt": "Two sentences, max 200 characters",
  "category": "One of: Nutrition Science | Wellness Science | Technology | Meal Prep | Tips & Tricks | Health Science | Nutrition Basics",
  "readTime": "6 min",
  "keywords": "6-8 comma-separated phrases",
  "image": "https://images.unsplash.com/photo-PHOTOID?w=800&q=80",
  "sources": [
    "Organization. Page title. https://example.gov/page",
    "Organization. Page title. https://example.gov/other"
  ],
  "body": [
    { "type": "paragraph", "text": "..." },
    { "type": "heading", "text": "..." },
    { "type": "callout", "text": "..." },
    { "type": "list", "items": ["...", "..."] },
    { "type": "image", "src": "https://images.unsplash.com/photo-OTHERID?w=800&q=80", "alt": "descriptive alt text" },
    { "type": "paragraph", "text": "${DISCLAIMER}" },
    { "type": "cta" }
  ]
}

Body rules:
- About six minutes to read
- Start with a paragraph
- Use 3 or 4 specific headings
- Include one list and one callout
- Include one inline image with a different Unsplash id than the hero
- End with the disclaimer paragraph, then a cta block
- Do not add a Sources heading inside body
- Inline tags are limited to <strong>, <em>, and <a href="https://..."> for the same URLs you list in sources`

  return [
    { role: 'system', content: system },
    { role: 'user', content: user },
  ]
}

export function modelName(env) {
  return String(env.BLOG_MODEL || '').trim() || DEFAULT_MODEL
}

export function buildChatRequest(topic, existing, env = {}) {
  const key = String(env.XAI_API_KEY || '').trim()
  return {
    url: XAI_URL,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: {
      model: modelName(env),
      temperature: 0.4,
      messages: buildMessages(topic, existing),
    },
  }
}

export function formatRequest(request) {
  const headers = { ...request.headers, Authorization: 'Bearer ***' }
  const headerLines = Object.entries(headers).map(([name, value]) => `${name}: ${value}`)
  return [
    `${request.method} ${request.url}`,
    ...headerLines,
    '',
    JSON.stringify(request.body, null, 2),
  ].join('\n')
}

export function messageText(payload) {
  const content = payload?.choices?.[0]?.message?.content
  if (typeof content === 'string') return content.trim()
  if (Array.isArray(content)) {
    return content.map((part) => {
      if (typeof part === 'string') return part
      return part?.text || part?.content || ''
    }).join('').trim()
  }
  return ''
}

export function parseModelJson(raw) {
  const trimmed = String(raw || '')
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim()
  if (!trimmed) throw new BlogError('xAI response was empty and could not be parsed')
  const attempts = [trimmed]
  const start = trimmed.indexOf('{')
  const end = trimmed.lastIndexOf('}')
  if (start !== -1 && end > start) attempts.push(trimmed.slice(start, end + 1))
  let lastError = null
  for (const candidate of attempts) {
    try {
      const parsed = JSON.parse(candidate)
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new BlogError('xAI response JSON was not an object')
      }
      return parsed
    } catch (error) {
      lastError = error
    }
  }
  throw new BlogError(`Failed to parse xAI JSON response: ${lastError.message}\nRaw: ${trimmed.slice(0, 800)}`)
}

function todayISO(now = new Date()) {
  return now.toISOString().slice(0, 10)
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDisplayDate(isoDate) {
  const [year, month, day] = String(isoDate).split('-')
  return `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`
}

export function normalizeSources(sources) {
  if (sources == null || sources === '') return []
  const list = Array.isArray(sources) ? sources : [sources]
  return list.map((item) => {
    if (typeof item === 'string') return item.trim()
    if (item && typeof item === 'object') {
      const label = String(item.title || item.name || item.label || '').trim()
      const url = String(item.url || item.href || '').trim()
      return [label, url].filter(Boolean).join(' ').trim()
    }
    return ''
  }).filter(Boolean)
}

export function sourceUrls(text) {
  return String(text || '').match(/https:\/\/[^\s)<>"]+/g) || []
}

export function citationHostOk(url) {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/\.$/, '')
    return SOURCE_HOST_SUFFIXES.some((suffix) => host === suffix || host.endsWith(`.${suffix}`))
  } catch {
    return false
  }
}

function cleanExcerpt(value, fallback) {
  const text = String(value || fallback || '').replace(/\s+/g, ' ').trim()
  if (text.length <= 200) return text
  const cut = text.slice(0, 197)
  const space = cut.lastIndexOf(' ')
  return `${(space > 80 ? cut.slice(0, space) : cut).trim()}...`
}

function textBlock(block) {
  if (block.type === 'list') {
    return { type: 'list', items: (Array.isArray(block.items) ? block.items : []).map((item) => String(item)) }
  }
  if (block.type === 'image') {
    return { type: 'image', src: String(block.src || ''), alt: String(block.alt || '') }
  }
  if (block.type === 'cta') return { type: 'cta' }
  return { type: block.type, text: String(block.text || '') }
}

function ensureBody(body) {
  const blocks = body.filter((block) => block && typeof block.type === 'string').map(textBlock)
  const withoutSourceHeading = []
  for (const block of blocks) {
    if (block.type === 'heading' && /^(sources|references)$/i.test(String(block.text || '').trim())) continue
    withoutSourceHeading.push(block)
  }
  const hasDisclaimer = withoutSourceHeading.some((block) => (
    block.type === 'paragraph' && /not medical advice/i.test(String(block.text || ''))
  ))
  const ctaIndex = withoutSourceHeading.findIndex((block) => block.type === 'cta')
  const content = ctaIndex === -1 ? withoutSourceHeading : withoutSourceHeading.slice(0, ctaIndex)
  if (!hasDisclaimer) content.push({ type: 'paragraph', text: DISCLAIMER })
  content.push({ type: 'cta' })
  return content
}

export function normalizePost(raw, topic, dateISO) {
  const title = String(raw.title || topic.title || '').trim()
  if (!title || !slugify(title)) throw new BlogError('xAI response did not include a title')
  if (!Array.isArray(raw.body) || raw.body.length === 0) {
    throw new BlogError('xAI response did not include a body')
  }
  const image = String(raw.image || '').trim()
  return {
    slug: slugify(title),
    title,
    excerpt: cleanExcerpt(raw.excerpt, topic.angle),
    author: AUTHOR.name,
    authorInitial: AUTHOR.initial,
    date: formatDisplayDate(dateISO),
    dateISO,
    readTime: /^\d+\s*min$/.test(String(raw.readTime || '').trim())
      ? String(raw.readTime).trim().replace(/\s+/, ' ')
      : '6 min',
    category: CATEGORIES.has(raw.category) ? raw.category : 'Nutrition Science',
    keywords: Array.isArray(raw.keywords) ? raw.keywords.join(', ') : String(raw.keywords || topic.title),
    image: UNSPLASH_IMAGE.test(image) ? image : '',
    body: ensureBody(raw.body),
    sources: normalizeSources(raw.sources ?? raw.citations),
  }
}

function bodyText(post) {
  return (post.body || []).map((block) => {
    if (Array.isArray(block.items)) return block.items.join(' ')
    return `${block.text || ''} ${block.src || ''}`
  }).join('\n')
}

export function assertPublishable(post, topic, existing) {
  const blob = bodyText(post)
  if (UNSAFE_HTML.test(blob) || UNSAFE_HTML.test(post.excerpt || '')) {
    throw new BlogError('Rejected draft because it contained unsafe HTML')
  }
  if (FICTIONAL_DOCTOR.test(blob) || FICTIONAL_DOCTOR.test(post.title)) {
    throw new BlogError('Rejected draft because it invented a doctor or credentialed byline')
  }
  if ((post.body || []).some((block) => block.type === 'heading' && BANNED_HEADING.test(String(block.text || '')))) {
    throw new BlogError('Rejected draft because it used the heading "What the Science Actually Says"')
  }
  if (!(post.body || []).some((block) => block.type === 'paragraph' && String(block.text || '').trim())) {
    throw new BlogError('Rejected draft because it had no paragraph')
  }
  const clash = findClash({ title: post.title, slug: post.slug }, existing)
  if (clash) {
    throw new BlogError(`Rejected topic "${post.title}" (${post.slug}) — too close to "${clash.title}" (${clash.slug}, ${clash.reason})`)
  }
  if (jaccard(tokens(topic.title), tokens(post.title)) < 0.2) {
    throw new BlogError(`Rejected draft "${post.title}" because it left the assigned topic "${topic.title}"`)
  }
  if (!Array.isArray(post.sources) || post.sources.length < 2) {
    throw new BlogError('Rejected draft because the Sources list needs at least two real citations')
  }
  for (const source of post.sources) {
    const urls = sourceUrls(source)
    if (urls.length === 0 || urls.some((url) => !citationHostOk(url))) {
      throw new BlogError(`Rejected draft because a source is missing a NIH, PubMed, or major health-body URL: ${source.slice(0, 180)}`)
    }
  }
}

export function insertPost(src, post) {
  const insertionPoint = src.lastIndexOf(']')
  if (insertionPoint === -1) throw new BlogError('Could not find closing ] in generatedPosts.js', { retryable: false })
  if (src.slice(insertionPoint + 1).trim() !== '') {
    throw new BlogError('Unexpected content after generatedPosts array', { retryable: false })
  }
  const postJson = JSON.stringify(post, null, 2).split('\n').map((line) => `  ${line}`).join('\n')
  const before = src.slice(0, insertionPoint).trimEnd()
  const separator = before.endsWith('[') ? '\n' : ',\n'
  return `${before}${separator}${postJson}\n]\n`
}

function randomFallback() {
  const id = FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)]
  return `https://images.unsplash.com/${id}?w=800&q=80`
}

async function verifyImageUrl(url, fetchImpl) {
  try {
    const response = await fetchImpl(url, { method: 'HEAD', signal: AbortSignal.timeout(15000) })
    return response.ok
  } catch {
    return false
  }
}

async function safeImageUrl(url, fetchImpl) {
  if (!UNSPLASH_IMAGE.test(url || '')) return randomFallback()
  const ok = await verifyImageUrl(url, fetchImpl)
  if (!ok) return randomFallback()
  return url
}

export function listOpenPullRequests() {
  try {
    const raw = execFileSync(
      'gh',
      ['pr', 'list', '--state', 'open', '--limit', '100', '--json', 'title,headRefName'],
      {
        encoding: 'utf8',
        timeout: 20000,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...process.env, GH_PROMPT_DISABLED: '1' },
      },
    )
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) throw new BlogError('Open PR list was not an array', { retryable: false })
    return parsed
  } catch (error) {
    if (error instanceof BlogError) throw error
    const message = error.stderr?.toString?.() || error.message
    if (process.env.GITHUB_ACTIONS) {
      throw new BlogError(`Could not list open blog PRs: ${message.split('\n')[0]}`, { retryable: false })
    }
    console.warn(`[Blog] Open PR check skipped: ${message.split('\n')[0]}`)
    return []
  }
}

async function defaultComplete(request, fetchImpl) {
  let response
  try {
    response = await fetchImpl(request.url, {
      method: request.method,
      headers: request.headers,
      body: JSON.stringify(request.body),
      signal: AbortSignal.timeout(120000),
    })
  } catch (error) {
    throw new BlogError(`xAI request failed: ${error.message}`)
  }
  const text = await response.text()
  if (!response.ok) {
    const retryable = response.status === 429 || response.status >= 500
    throw new BlogError(`xAI error ${response.status}: ${text.slice(0, 500)}`, { retryable })
  }
  let payload
  try {
    payload = JSON.parse(text)
  } catch (error) {
    throw new BlogError(`Failed to parse xAI JSON response: ${error.message}\nRaw: ${text.slice(0, 800)}`)
  }
  const content = messageText(payload)
  if (!content) throw new BlogError('xAI response did not include a message to parse')
  return content
}

export async function run(options = {}) {
  const env = options.env || process.env
  const log = options.log || console.log
  const dryRun = Boolean(options.dryRun)
  const now = options.now || new Date()
  const fetchImpl = options.fetchImpl || fetch
  const existing = options.existing || collectExisting({
    generatedPosts,
    staticPosts,
    postRedirects,
    pullRequests: await (options.listPullRequests || listOpenPullRequests)(),
  })
  const selection = chooseTopic(options.catalog || TOPIC_CATALOG, existing, { now })
  log(`[Blog] Skipped ${selection.skipped.length} topics too close to an existing post, retired slug, or open blog PR`)
  if (!selection.topic) {
    throw new BlogError('No topic left that is not too close to an existing post, retired slug, or open blog PR', { retryable: false })
  }

  const preview = buildChatRequest(selection.topic, existing, env)
  log(`[Blog] Chosen topic: ${selection.topic.title}`)
  log(`[Blog] Slug: ${selection.topic.slug}`)
  if (dryRun) {
    log('[Blog] Request:')
    log(formatRequest(preview))
    return { topic: selection.topic, request: preview, wrote: false }
  }

  const key = String(env.XAI_API_KEY || '').trim()
  if (!key) throw new BlogError('Missing XAI_API_KEY', { retryable: false })

  const queue = [selection.topic, ...selection.alternatives].slice(0, 1 + MAX_TOPIC_RETRIES)
  let lastError = null
  for (let attempt = 0; attempt < queue.length; attempt += 1) {
    const topic = queue[attempt]
    const retryLabel = attempt === 0 ? '' : ` Retry ${attempt} of ${MAX_TOPIC_RETRIES}.`
    if (attempt > 0) log(`[Blog] Trying a new topic: ${topic.title}.${retryLabel}`)
    try {
      const request = buildChatRequest(topic, existing, { ...env, XAI_API_KEY: key })
      log(`[Blog] Calling xAI (${request.body.model}) for "${topic.title}"`)
      const raw = await (options.complete || ((chatRequest) => defaultComplete(chatRequest, fetchImpl)))(request)
      const post = normalizePost(parseModelJson(raw), topic, todayISO(now))
      assertPublishable(post, topic, existing)
      post.image = await safeImageUrl(post.image, fetchImpl)
      for (const block of post.body) {
        if (block.type === 'image') block.src = await safeImageUrl(block.src, fetchImpl)
      }
      if (options.writeFile === false) return { topic, post, wrote: false }
      const updated = insertPost(readFileSync(DATA_FILE, 'utf8'), post)
      writeFileSync(DATA_FILE, updated, 'utf8')
      log(`[Blog] Appended "${post.title}" (${post.slug})`)
      return { topic, post, wrote: true }
    } catch (error) {
      lastError = error
      if (error.retryable === false) throw error
      log(`[Blog] ${error.message}`)
      if (attempt === queue.length - 1) break
      log(`[Blog] Rejected this topic. Retry ${attempt + 1} of ${MAX_TOPIC_RETRIES}.`)
    }
  }
  throw new BlogError(`${lastError?.message || 'Failed to generate a post'} (stopped after ${MAX_TOPIC_RETRIES} retries)`, { retryable: false })
}

function writeGithubOutput(name, value) {
  const file = process.env.GITHUB_OUTPUT
  if (!file) return
  const body = String(value ?? '').replace(/\r?\n/g, ' ').trim()
  appendFileSync(file, `${name}<<BLOG_OUTPUT_END\n${body}\nBLOG_OUTPUT_END\n`)
}

async function main() {
  try {
    const dryRun = process.argv.includes('--dry-run')
    const result = await run({ dryRun, env: process.env, writeFile: !dryRun })
    if (result.post) {
      writeGithubOutput('slug', result.post.slug)
      writeGithubOutput('date', result.post.dateISO)
      writeGithubOutput('title', result.post.title)
      writeGithubOutput('excerpt', result.post.excerpt)
      console.log(`[Blog] Done. /blog/${result.post.slug}`)
    }
  } catch (error) {
    console.error('[Blog] ERROR:', error.message)
    process.exit(1)
  }
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (invokedDirectly) main()
