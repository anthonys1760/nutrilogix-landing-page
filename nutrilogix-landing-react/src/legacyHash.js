/**
 * Map a legacy HashRouter URL fragment to a BrowserRouter path.
 * Only fragments that start with `#/` are old routes. In-page anchors
 * such as `#features` and `#signup` are left alone.
 * Returns null when the hash is not a legacy route.
 */
export function legacyHashToPath(hash) {
  if (typeof hash !== 'string' || !hash.startsWith('#/')) return null

  let target = hash.slice(1)
  const extraHash = target.indexOf('#')
  if (extraHash !== -1) target = target.slice(0, extraHash)
  if (!target.startsWith('/')) return null

  const queryAt = target.indexOf('?')
  const path = queryAt === -1 ? target : target.slice(0, queryAt)
  const query = queryAt === -1 ? '' : target.slice(queryAt)
  const normalized = path.length > 1 ? path.replace(/\/+$/, '') : '/'
  if (!normalized.startsWith('/')) return null
  return `${normalized}${query}`
}
