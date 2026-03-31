#!/usr/bin/env node
/**
 * generate-blog-post.mjs
 *
 * Generates a new Nutrilogix blog post using OpenRouter (Claude) and uses a
 * direct Unsplash CDN URL for the image (no API key required).
 * Appends the post to src/data/generatedPosts.js.
 *
 * Required env vars:
 *   OPENROUTER_API_KEY — OpenRouter API key
 */

import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ── Config ──────────────────────────────────────────────────────────────────

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
if (!OPENROUTER_API_KEY) { console.error('[Blog] Missing OPENROUTER_API_KEY'); process.exit(1) }

const AUTHORS = [
  { name: 'Dr. Alex Rivera', initial: 'A' },
  { name: 'Dr. Sarah Miller', initial: 'S' },
  { name: 'Dr. Rachel Kim', initial: 'R' },
]

const DATA_FILE = path.join(ROOT, 'src/data/generatedPosts.js')

// ── Helpers ──────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split('T')[0]
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
  })
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

function loadExistingPosts() {
  const src = readFileSync(DATA_FILE, 'utf8')
  const slugMatches = [...src.matchAll(/slug:\s*'([^']+)'/g)]
  const titleMatches = [...src.matchAll(/title:\s*'([^']+)'/g)]
  return {
    slugs: slugMatches.map(m => m[1]),
    titles: titleMatches.map(m => m[1]),
  }
}

// ── OpenRouter call ───────────────────────────────────────────────────────────

async function generatePost(existingSlugs, existingTitles) {
  const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)]
  const dateISO = today()

  const prompt = `You are a nutrition science writer for Nutrilogix, an AI-powered food tracking app.

Write a NEW blog post about nutrition, wellness, or healthy eating. It must NOT overlap with these existing topics:
${existingTitles.map(t => `- ${t}`).join('\n')}

The post should be evidence-based, ~6 minutes to read, and subtly tie back to how AI food tracking (like Nutrilogix) helps the reader. Do NOT be promotional — the Nutrilogix mention should be brief and natural.

For the featured image, provide a direct Unsplash CDN URL using a real photo ID you know exists (format: https://images.unsplash.com/photo-PHOTOID?w=800&q=80). Choose a photo relevant to the post topic (food, nutrition, wellness, cooking, etc).

Respond ONLY with valid JSON (no markdown, no extra text) matching this exact schema:
{
  "title": "Post title here",
  "excerpt": "2-sentence excerpt for the blog card (max 200 chars)",
  "category": "One of: Nutrition Science | Wellness Science | Technology | Meal Prep | Tips & Tricks | Health Science | Nutrition Basics",
  "readTime": "X min",
  "image": "https://images.unsplash.com/photo-PHOTOID?w=800&q=80",
  "body": [
    { "type": "paragraph", "text": "..." },
    { "type": "heading", "text": "..." },
    { "type": "callout", "text": "..." },
    { "type": "list", "items": ["...", "..."] },
    { "type": "image", "src": "https://images.unsplash.com/photo-PHOTOID?w=800&q=80", "alt": "descriptive alt text" },
    { "type": "cta" }
  ]
}

Body rules:
- 6-9 body blocks total
- Start with a paragraph hook
- Include 3-4 headings
- Include 1-2 callouts with research stats (use <strong> for emphasis)
- Include 1 list block
- Include 1 inline image block with a DIFFERENT Unsplash photo ID than the featured image
- End with a cta block
- Use <em> and <strong> HTML tags inline in paragraph/callout text where appropriate
- paragraph and callout "text" fields may contain inline HTML tags only`

  console.log('[Blog] Calling OpenRouter to generate post...')

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://nutrilogix.app',
      'X-Title': 'Nutrilogix Blog Automation',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3-5-haiku',
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenRouter error ${response.status}: ${err}`)
  }

  const data = await response.json()
  const raw = data.choices[0].message.content.trim()

  const jsonStr = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()

  let post
  try {
    post = JSON.parse(jsonStr)
  } catch (e) {
    throw new Error(`Failed to parse OpenRouter JSON response: ${e.message}\nRaw: ${raw}`)
  }

  post.author = author.name
  post.authorInitial = author.initial
  post.date = formatDate(dateISO)
  post.dateISO = dateISO
  post.slug = slugify(post.title)

  if (existingSlugs.includes(post.slug)) {
    post.slug = `${post.slug}-${dateISO}`
  }

  console.log(`[Blog] Generated post: "${post.title}" (slug: ${post.slug})`)
  return post
}

// ── Write to data file ────────────────────────────────────────────────────────

function appendPostToDataFile(post) {
  const src = readFileSync(DATA_FILE, 'utf8')

  const postJson = JSON.stringify(post, null, 2)
    .split('\n')
    .map(line => '  ' + line)
    .join('\n')

  const insertionPoint = src.lastIndexOf(']')
  if (insertionPoint === -1) throw new Error('Could not find closing ] in generatedPosts.js')

  const before = src.slice(0, insertionPoint).trimEnd()
  const after = src.slice(insertionPoint)

  const separator = before.endsWith('[') ? '\n' : ',\n'
  const updated = before + separator + postJson + '\n' + after

  writeFileSync(DATA_FILE, updated, 'utf8')
  console.log(`[Blog] Appended post to ${DATA_FILE}`)
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  try {
    const { slugs, titles } = loadExistingPosts()
    console.log(`[Blog] Found ${slugs.length} existing posts`)

    const post = await generatePost(slugs, titles)

    appendPostToDataFile(post)

    console.log(`[Blog] Done! New post: /#/blog/${post.slug}`)
  } catch (err) {
    console.error('[Blog] ERROR:', err.message)
    process.exit(1)
  }
}

main()
