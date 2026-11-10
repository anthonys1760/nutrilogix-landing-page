import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { generatedPosts } from '../src/data/generatedPosts.js'
import { legacyHashToPath } from '../src/legacyHash.js'
import { canonicalUrl, extractBlogPosting, toCanonicalPath } from '../src/seoHead.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

test('legacy hash routes map to path URLs', () => {
  assert.equal(legacyHashToPath('#/'), '/')
  assert.equal(legacyHashToPath('#/blog'), '/blog')
  assert.equal(legacyHashToPath('#/privacy'), '/privacy')
  assert.equal(legacyHashToPath('#/terms'), '/terms')
  assert.equal(legacyHashToPath('#/blog/sleep-and-nutrition'), '/blog/sleep-and-nutrition')
  assert.equal(legacyHashToPath('#/blog/sleep-and-nutrition/'), '/blog/sleep-and-nutrition')
  assert.equal(legacyHashToPath('#/privacy?ref=old'), '/privacy?ref=old')
})

test('in-page anchors are not treated as legacy routes', () => {
  assert.equal(legacyHashToPath('#features'), null)
  assert.equal(legacyHashToPath('#signup'), null)
  assert.equal(legacyHashToPath('#how-it-works'), null)
  assert.equal(legacyHashToPath(''), null)
  assert.equal(legacyHashToPath(null), null)
  assert.equal(legacyHashToPath('#/'), '/')
})

test('every published post hash redirects to its path', () => {
  const src = readFileSync(join(root, 'src/pages/BlogPost.jsx'), 'utf8')
  const hardcoded = [...src.matchAll(/slug === '([^']+)'/g)].map((match) => match[1])
  const slugs = [...generatedPosts.map((post) => post.slug), ...hardcoded]
  assert.ok(slugs.length >= 70)
  for (const slug of slugs) {
    assert.equal(legacyHashToPath(`#/blog/${slug}`), `/blog/${slug}`)
    assert.equal(canonicalUrl(`/blog/${slug}/`), `https://nutrilogix-ai.com/blog/${slug}`)
  }
})

test('canonical paths drop trailing slashes except the homepage', () => {
  assert.equal(toCanonicalPath('/'), '/')
  assert.equal(toCanonicalPath('/blog/'), '/blog')
  assert.equal(toCanonicalPath('/blog/foo/'), '/blog/foo')
  assert.equal(canonicalUrl('/'), 'https://nutrilogix-ai.com/')
})

test('extractBlogPosting reads article JSON-LD and ignores the site graph', () => {
  const html = `
    <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","name":"Nutrilogix"}]}</script>
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"BlogPosting","headline":"Hello","datePublished":"2026-03-31","author":{"@type":"Person","name":"Anthony Smith"}}</script>
  `
  const posting = extractBlogPosting(html)
  assert.equal(posting.headline, 'Hello')
  assert.equal(posting.datePublished, '2026-03-31')
  assert.equal(posting.author.name, 'Anthony Smith')
})
