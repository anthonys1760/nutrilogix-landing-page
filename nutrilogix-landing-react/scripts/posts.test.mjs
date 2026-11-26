import assert from 'node:assert/strict'
import test from 'node:test'
import { generatedPosts } from '../src/data/generatedPosts.js'
import { isPublished } from '../src/isPublished.js'
import {
  FEATURED_SLUGS,
  PAGE_SIZE,
  blogPageCount,
  blogPagePath,
  featuredPosts,
  listPublishedPosts,
  relatedPostsFor,
} from '../src/posts.js'

const now = new Date('2026-11-16T18:00:00.000Z')
const future = new Date('2026-01-01T18:00:00.000Z')

test('listPublishedPosts excludes future-dated posts', () => {
  const published = listPublishedPosts(now)
  assert.equal(published.some((post) => post.slug === 'holiday-party-logging'), false)
  assert.equal(published.some((post) => post.slug === 'how-does-water-help-with-metabolism'), false)
  assert.ok(published.length >= 60)
  const early = listPublishedPosts(future)
  assert.ok(early.length < published.length)
  assert.equal(early.every((post) => isPublished(post, future)), true)
})

test('how-does-water-help-with-metabolism publishes on its dateISO, not before', () => {
  const before = new Date('2026-12-02T18:00:00.000Z')
  const onDay = new Date('2026-12-03T17:00:00.000Z')
  assert.equal(listPublishedPosts(before).some((post) => post.slug === 'how-does-water-help-with-metabolism'), false)
  assert.equal(listPublishedPosts(onDay).some((post) => post.slug === 'how-does-water-help-with-metabolism'), true)
  const water = generatedPosts.find((post) => post.slug === 'how-does-water-help-with-metabolism')
  assert.ok(water)
  assert.equal(water.dateISO, '2026-12-03')
  assert.equal(isPublished(water, before), false)
  assert.equal(isPublished(water, onDay), true)
})

test('related posts are published, 2–3 items, and skip the current slug', () => {
  const published = listPublishedPosts(now)
  const sample = published.find((post) => post.slug === 'beta-glucan-oats-cholesterol-blood-sugar-science')
  assert.ok(sample)
  const related = relatedPostsFor(sample.slug, now)
  assert.ok(related.length >= 2 && related.length <= 3)
  assert.equal(related.some((post) => post.slug === sample.slug), false)
  assert.equal(related.some((post) => post.slug === 'holiday-party-logging'), false)
  assert.ok(related.some((post) => post.category === sample.category))
})

test('related posts fall back to most recent when nothing shares category or tags', () => {
  const related = relatedPostsFor('no-such-post', now)
  const published = listPublishedPosts(now)
  assert.deepEqual(related.map((post) => post.slug), published.slice(0, 3).map((post) => post.slug))
})

test('featured posts prefer the high-impression slugs when published', () => {
  const featured = featuredPosts(now)
  assert.ok(featured.length >= 3 && featured.length <= 4)
  for (const slug of FEATURED_SLUGS) {
    assert.ok(featured.some((post) => post.slug === slug), slug)
  }
})

test('blog pagination paths are crawlable and skip page 1 as a nested path', () => {
  const total = listPublishedPosts(now).length
  const pages = blogPageCount(total)
  assert.ok(pages > 1)
  assert.equal(blogPagePath(1), '/blog')
  assert.equal(blogPagePath(2), '/blog/page/2')
  assert.equal(blogPagePath(2, 'Nutrition Science'), '/blog/page/2?topic=Nutrition%20Science')
  assert.equal(Math.ceil(total / PAGE_SIZE), pages)
})

test('high-impression posts include contextual internal links', () => {
  const bySlug = Object.fromEntries(generatedPosts.map((post) => [post.slug, JSON.stringify(post.body).replace(/\\"/g, '"')]))
  assert.match(bySlug['beta-glucan-oats-cholesterol-blood-sugar-science'], /href="\/blog\/dietary-fiber-gut-health-benefits"/)
  assert.match(bySlug['beta-glucan-oats-cholesterol-blood-sugar-science'], /href="\/blog\/glycemic-index-vs-glycemic-load-blood-sugar"/)
  assert.match(bySlug['dietary-fiber-gut-health-benefits'], /href="\/blog\/beta-glucan-oats-cholesterol-blood-sugar-science"/)
  assert.match(bySlug['plant-protein-vs-animal-protein-muscle-science'], /href="\/blog\/protein-timing-muscle-fat-loss"/)
  assert.match(bySlug['protein-timing-muscle-fat-loss'], /href="\/blog\/plant-protein-vs-animal-protein-muscle-science"/)
  assert.match(bySlug['thermic-effect-of-food-metabolism'], /href="\/blog\/plant-protein-vs-animal-protein-muscle-science"/)
  assert.match(bySlug['thermic-effect-of-food-metabolism'], /href="\/blog\/beta-glucan-oats-cholesterol-blood-sugar-science"/)
  assert.match(bySlug['hydration-metabolism-water-fat-loss'], /href="\/blog\/thermic-effect-of-food-metabolism"/)
  assert.match(bySlug['glycemic-index-vs-glycemic-load-blood-sugar'], /href="\/blog\/beta-glucan-oats-cholesterol-blood-sugar-science"/)
})
