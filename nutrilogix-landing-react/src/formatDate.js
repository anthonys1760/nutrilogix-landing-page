const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function todayISO() {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${today.getFullYear()}-${month}-${day}`
}

/** One display format: "Nov 10, 2026". Future dates are clamped so they are not shown. */
export function formatPostDate(iso) {
  if (!iso || typeof iso !== 'string') return ''
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!match) return iso
  let [, year, month, day] = match
  if (`${year}-${month}-${day}` > todayISO()) {
    const today = todayISO()
    year = today.slice(0, 4)
    month = today.slice(5, 7)
    day = today.slice(8, 10)
  }
  return `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`
}

export function sourceLines(post) {
  if (!post) return []
  const raw = post.sources ?? post.citations
  if (raw == null || raw === '') return []
  const list = Array.isArray(raw) ? raw : [raw]
  return list.map((item) => {
    if (typeof item === 'string') return item.trim()
    if (item && typeof item === 'object') {
      const label = String(item.title || item.name || item.label || '').trim()
      const url = String(item.url || item.href || '').trim()
      if (label && url && !label.includes(url)) return `${label} ${url}`
      return label || url
    }
    return ''
  }).filter(Boolean)
}
