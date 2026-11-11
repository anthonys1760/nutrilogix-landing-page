import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { pathToFileURL } from 'node:url'
import { generatedPosts } from '../src/data/generatedPosts.js'
import { postRedirects } from '../src/data/postRedirects.js'
import { staticPosts } from '../src/data/staticPosts.js'
import { sourceLines } from '../src/formatDate.js'
import {
  BlogError,
  DISCLAIMER,
  TOPIC_CATALOG,
  XAI_URL,
  assertPublishable,
  buildChatRequest,
  citationHostOk,
  collectExisting,
  findClash,
  formatRequest,
  insertPost,
  modelName,
  normalizePost,
  parseModelJson,
  run,
  slugify,
} from './generate-blog-post.mjs'

const published = collectExisting({
  generatedPosts,
  staticPosts,
  postRedirects,
  pullRequests: [],
})

const LABEL_TOPIC = {
  title: 'How to Read a Nutrition Facts Label',
  slug: 'how-to-read-a-nutrition-facts-label',
  angle: 'Walk through the FDA Nutrition Facts label.',
}

function draft(title, { heading = 'Serving size' } = {}) {
  return JSON.stringify({
    title,
    excerpt: 'A short excerpt for the card.',
    category: 'Nutrition Basics',
    readTime: '6 min',
    keywords: 'nutrition facts label, serving size',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80',
    sources: [
      'FDA. How to Understand and Use the Nutrition Facts Label. https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label',
      'NIH. MedlinePlus healthy eating. https://medlineplus.gov/nutrition.html',
    ],
    body: [
      { type: 'paragraph', text: 'Start with the serving size.' },
      { type: 'heading', text: heading },
      { type: 'paragraph', text: 'Then read added sugars.' },
      { type: 'cta' },
    ],
  })
}

test('retired, redirected, and published topics are too close to repeat', () => {
  const cases = [
    ['The Thermic Effect of Food', 'thermic-effect-of-food'],
    ['Science of Hydration', 'science-of-hydration'],
    ['The End of Manual Logging', 'the-end-of-manual-logging'],
    ['Probiotics vs Prebiotics Gut Health Science', 'probiotics-vs-prebiotics-gut-health-science'],
    ['Sleep Deprivation Hunger Hormones and Weight Loss', 'sleep-deprivation-hunger-hormones-weight-loss'],
    ['Intermittent Fasting and Metabolism: What the Science Actually Says', 'intermittent-fasting-and-metabolism-what-the-science-actually-says'],
  ]
  for (const [title, slug] of cases) {
    const clash = findClash({ title, slug }, published)
    assert.ok(clash, `expected a clash for ${slug}`)
  }
})

test('catalog topics are not already published, retired, or redirected', () => {
  const clashes = TOPIC_CATALOG.flatMap((topic) => {
    const clash = findClash({ title: topic.title, slug: slugify(topic.title) }, published)
    return clash ? [`${topic.title} -> ${clash.title} (${clash.slug}, ${clash.reason})`] : []
  })
  assert.deepEqual(clashes, [])
})

test('an open blog pull request blocks that slug and title', () => {
  const existing = collectExisting({
    generatedPosts: [],
    staticPosts: [],
    postRedirects: {},
    pullRequests: [{
      title: 'content(blog): How to Read a Nutrition Facts Label',
      headRefName: 'blog/2026-11-12-how-to-read-a-nutrition-facts-label',
    }],
  })
  const clash = findClash({
    title: 'How to Read a Nutrition Facts Label',
    slug: 'how-to-read-a-nutrition-facts-label',
  }, existing)
  assert.equal(clash.kind, 'pull-request')
  const unrelated = collectExisting({
    generatedPosts: [],
    staticPosts: [],
    postRedirects: {},
    pullRequests: [{
      title: 'Fix the homepage hero',
      headRefName: 'cursor/homepage-hero',
    }],
  })
  assert.equal(findClash({
    title: 'Fix the Homepage Hero',
    slug: 'fix-the-homepage-hero',
  }, unrelated), null)
})

test('the chat request uses xAI Grok and does not print the key', () => {
  const request = buildChatRequest(LABEL_TOPIC, published, {
    XAI_API_KEY: 'super-secret-key',
    BLOG_MODEL: '',
  })
  assert.equal(request.url, XAI_URL)
  assert.equal(request.method, 'POST')
  assert.equal(request.body.model, 'grok-4.7')
  assert.equal(request.headers.Authorization, 'Bearer super-secret-key')
  assert.equal(modelName({ BLOG_MODEL: 'grok-custom' }), 'grok-custom')
  assert.equal(buildChatRequest(LABEL_TOPIC, [], { BLOG_MODEL: 'grok-custom' }).body.model, 'grok-custom')

  const printed = formatRequest(request)
  assert.equal(printed.includes('super-secret-key'), false)
  assert.match(printed, /POST https:\/\/api\.x\.ai\/v1\/chat\/completions/)
  assert.match(printed, /Authorization: Bearer \*\*\*/)
  assert.match(printed, /Anthony Smith/)
  assert.match(printed, /not medical advice/)
  assert.match(printed, /What the Science Actually Says/)
  assert.match(printed, /photo meal logging/)
  assert.match(printed, /voice meal logging/)
  assert.match(printed, /barcode lookup/)
  assert.match(printed, /Apple Health sync/)
  assert.match(printed, /images\.unsplash\.com\/photo-/)
  assert.match(printed, new RegExp(LABEL_TOPIC.title))
  assert.doesNotMatch(printed, /openrouter/i)
  assert.equal(citationHostOk('https://pubmed.ncbi.nlm.nih.gov/123/'), true)
  assert.equal(citationHostOk('https://ods.od.nih.gov/factsheets/VitaminD-Consumer/'), true)
  assert.equal(citationHostOk('https://nutrition.example.com/post'), false)
})

test('drafts get the Anthony Smith byline, a disclaimer, and a sources list', () => {
  const post = normalizePost(JSON.parse(draft(LABEL_TOPIC.title)), LABEL_TOPIC, '2026-11-12')
  assert.equal(post.author, 'Anthony Smith')
  assert.equal(post.authorInitial, 'A')
  assert.equal(post.dateISO, '2026-11-12')
  assert.equal(post.body.at(-1).type, 'cta')
  assert.equal(post.body.at(-2).text, DISCLAIMER)
  assert.equal(sourceLines(post).length, 2)
  assert.match(sourceLines(post)[0], /https:\/\/www\.fda\.gov\//)
  assert.deepEqual(sourceLines({
    sources: [{ title: 'NIH vitamin D fact sheet', url: 'https://ods.od.nih.gov/factsheets/VitaminD-Consumer/' }],
  }), ['NIH vitamin D fact sheet https://ods.od.nih.gov/factsheets/VitaminD-Consumer/'])
  assert.throws(
    () => assertPublishable({
      ...post,
      body: [{ type: 'paragraph', text: 'Dr. Elena Torres recommends this.' }, { type: 'cta' }],
    }, LABEL_TOPIC, []),
    /doctor/,
  )
  assert.throws(
    () => assertPublishable({
      ...post,
      body: [{ type: 'heading', text: 'What the Science Actually Says' }, { type: 'paragraph', text: 'No.' }, { type: 'cta' }],
    }, LABEL_TOPIC, []),
    /What the Science Actually Says/,
  )
})

test('unparseable model output fails loudly', () => {
  assert.throws(() => parseModelJson('not json'), BlogError)
  assert.throws(() => parseModelJson(''), /could not be parsed/)
})

test('insertPost appends one object without dropping existing posts', async () => {
  const sample = normalizePost(JSON.parse(draft(LABEL_TOPIC.title)), LABEL_TOPIC, '2026-11-12')
  sample.slug = 'generator-insert-check'
  const next = insertPost(readFileSync(new URL('../src/data/generatedPosts.js', import.meta.url), 'utf8'), sample)
  const directory = mkdtempSync(path.join(tmpdir(), 'blog-insert-'))
  const file = path.join(directory, 'generatedPosts.js')
  writeFileSync(file, next)
  try {
    const imported = await import(pathToFileURL(file).href)
    assert.equal(imported.generatedPosts.length, generatedPosts.length + 1)
    assert.equal(imported.generatedPosts.at(-1).slug, 'generator-insert-check')
    assert.equal(imported.generatedPosts[0].slug, generatedPosts[0].slug)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})

test('dry-run prints the chosen topic and request without calling xAI', async () => {
  const logs = []
  let called = false
  const result = await run({
    dryRun: true,
    env: { XAI_API_KEY: 'super-secret-key' },
    now: new Date('2026-11-12T15:00:00Z'),
    listPullRequests: async () => [],
    log: (line) => logs.push(line),
    writeFile: false,
    fetchImpl: async () => { called = true; throw new Error('network') },
    complete: async () => { called = true; return '{}' },
  })
  assert.equal(called, false)
  assert.equal(result.wrote, false)
  const text = logs.join('\n')
  assert.match(text, /Chosen topic: /)
  assert.ok(text.includes(result.topic.title))
  assert.match(text, /Request:/)
  assert.match(text, /POST https:\/\/api\.x\.ai\/v1\/chat\/completions/)
  assert.equal(text.includes('super-secret-key'), false)
  const clash = findClash(result.topic, published)
  assert.equal(clash, null)
})

test('a missing XAI_API_KEY fails before any request', async () => {
  let called = false
  await assert.rejects(
    () => run({
      env: {},
      now: new Date('2026-11-12T15:00:00Z'),
      listPullRequests: async () => [],
      log: () => {},
      writeFile: false,
      complete: async () => { called = true; return draft(LABEL_TOPIC.title) },
    }),
    /Missing XAI_API_KEY/,
  )
  assert.equal(called, false)
})

test('a close or unusable draft is replaced up to 3 times', async () => {
  const catalog = [
    { title: 'How to Read a Nutrition Facts Label', angle: 'labels' },
    { title: 'Frozen Vegetables Versus Fresh', angle: 'frozen produce' },
    { title: 'Grocery Shopping on a Small Budget', angle: 'budget groceries' },
    { title: 'Canned Fish as a Weeknight Protein', angle: 'canned fish' },
  ]
  const existing = [{
    slug: 'sleep-and-nutrition',
    title: 'Sleep & Nutrition: How Poor Sleep Sabotages Your Diet',
    kind: 'generated',
  }]
  let calls = 0
  const result = await run({
    env: { XAI_API_KEY: 'test-key' },
    now: new Date('2026-01-01T12:00:00Z'),
    catalog,
    existing,
    listPullRequests: async () => [],
    log: () => {},
    writeFile: false,
    fetchImpl: async () => ({ ok: true }),
    complete: async (request) => {
      calls += 1
      const assigned = request.body.messages[1].content.match(/Title: (.+)/)[1]
      if (calls < 4) return draft('Sleep & Nutrition: How Poor Sleep Sabotages Your Diet')
      return draft(assigned)
    },
  })
  assert.equal(calls, 4)
  assert.equal(result.wrote, false)
  assert.equal(findClash(result.post, existing), null)

  calls = 0
  await assert.rejects(
    () => run({
      env: { XAI_API_KEY: 'test-key' },
      now: new Date('2026-01-01T12:00:00Z'),
      catalog,
      existing,
      listPullRequests: async () => [],
      log: () => {},
      writeFile: false,
      fetchImpl: async () => ({ ok: true }),
      complete: async () => {
        calls += 1
        return draft('Sleep & Nutrition: How Poor Sleep Sabotages Your Diet')
      },
    }),
    /stopped after 3 retries/,
  )
  assert.equal(calls, 4)
})

test('an auth failure is not retried', async () => {
  let calls = 0
  await assert.rejects(
    () => run({
      env: { XAI_API_KEY: 'test-key' },
      now: new Date('2026-01-01T12:00:00Z'),
      catalog: [{ title: 'How to Read a Nutrition Facts Label', angle: 'labels' }],
      existing: [],
      listPullRequests: async () => [],
      log: () => {},
      writeFile: false,
      complete: async () => {
        calls += 1
        throw new BlogError('xAI error 401: unauthorized', { retryable: false })
      },
    }),
    /xAI error 401/,
  )
  assert.equal(calls, 1)
})
