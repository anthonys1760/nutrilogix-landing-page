import assert from 'node:assert/strict'
import test from 'node:test'
import { isPublished, todayISO } from '../src/isPublished.js'

test('todayISO uses America/Detroit, not UTC', () => {
  // 2026-11-12 04:00 UTC is still 2026-11-11 23:00 in Eastern Standard Time.
  assert.equal(todayISO(new Date('2026-11-12T04:00:00.000Z')), '2026-11-11')
  // 2026-11-12 05:15 UTC is 2026-11-12 00:15 EST — the daily deploy window.
  assert.equal(todayISO(new Date('2026-11-12T05:15:00.000Z')), '2026-11-12')
})

test('isPublished includes today and earlier, excludes future dates', () => {
  const now = new Date('2026-11-12T16:00:00.000Z')
  assert.equal(isPublished({ dateISO: '2026-11-12' }, now), true)
  assert.equal(isPublished({ dateISO: '2026-11-11' }, now), true)
  assert.equal(isPublished({ dateISO: '2026-11-10' }, now), true)
  assert.equal(isPublished({ dateISO: '2026-11-13' }, now), false)
  assert.equal(isPublished({ dateISO: '2099-01-01' }, now), false)
})

test('isPublished rejects missing or malformed dates', () => {
  const now = new Date('2026-11-12T16:00:00.000Z')
  assert.equal(isPublished({}, now), false)
  assert.equal(isPublished({ dateISO: '' }, now), false)
  assert.equal(isPublished({ dateISO: 'Nov 12, 2026' }, now), false)
  assert.equal(isPublished(null, now), false)
})
