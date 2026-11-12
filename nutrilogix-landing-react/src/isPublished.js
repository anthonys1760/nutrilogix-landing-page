const TIME_ZONE = 'America/Detroit'

/** Today's calendar date in America/Detroit as YYYY-MM-DD. */
export function todayISO(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const value = (type) => parts.find((part) => part.type === type)?.value
  return `${value('year')}-${value('month')}-${value('day')}`
}

/**
 * A post is published when its dateISO is today or earlier in America/Detroit.
 * Intended future dates stay in source; they are not rewritten.
 */
export function isPublished(post, now = new Date()) {
  const iso = post?.dateISO
  if (typeof iso !== 'string') return false
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(iso)
  if (!match) return false
  return match[1] <= todayISO(now)
}
