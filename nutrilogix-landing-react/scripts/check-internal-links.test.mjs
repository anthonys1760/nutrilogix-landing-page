import assert from 'node:assert/strict'
import test from 'node:test'
import { listPublishedPosts } from '../src/posts.js'
import { unpublishedBlogLinkTargets } from './check-internal-links.mjs'

test('unpublishedBlogLinkTargets ignores published slugs and pagination', () => {
  const published = new Set(['alpha', 'beta'])
  const html = `
    <a href="/blog">Blog</a>
    <a href="/blog/page/2">Next</a>
    <a href="/blog/alpha">Alpha</a>
    <a href="/blog/future-dated-post">Future</a>
    <a href="/blog/beta">Beta again</a>
    <a href="/blog/future-dated-post">Future again</a>
  `
  assert.deepEqual(unpublishedBlogLinkTargets(html, published), ['future-dated-post'])
})

test('holiday-party-logging is allowed once its publish day arrives', () => {
  const before = new Date('2026-11-16T18:00:00.000Z')
  const onDay = new Date('2026-11-19T17:00:00.000Z')
  const beforeSlugs = new Set(listPublishedPosts(before).map((post) => post.slug))
  const onDaySlugs = new Set(listPublishedPosts(onDay).map((post) => post.slug))
  const html = '<a href="/blog/holiday-party-logging">Holiday party logging</a>'

  assert.deepEqual(unpublishedBlogLinkTargets(html, beforeSlugs), ['holiday-party-logging'])
  assert.deepEqual(unpublishedBlogLinkTargets(html, onDaySlugs), [])
  assert.ok(onDaySlugs.has('holiday-party-logging'))
})

test('how-does-water-help-with-metabolism is unpublished until Dec 3, 2026', () => {
  const before = new Date('2026-12-02T18:00:00.000Z')
  const onDay = new Date('2026-12-03T17:00:00.000Z')
  const beforeSlugs = new Set(listPublishedPosts(before).map((post) => post.slug))
  const onDaySlugs = new Set(listPublishedPosts(onDay).map((post) => post.slug))
  const html = '<a href="/blog/how-does-water-help-with-metabolism">Water and metabolism</a>'

  assert.deepEqual(unpublishedBlogLinkTargets(html, beforeSlugs), ['how-does-water-help-with-metabolism'])
  assert.deepEqual(unpublishedBlogLinkTargets(html, onDaySlugs), [])
  assert.equal(beforeSlugs.has('how-does-water-help-with-metabolism'), false)
  assert.ok(onDaySlugs.has('how-does-water-help-with-metabolism'))
})
