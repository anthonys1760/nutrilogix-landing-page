export const SITE_ORIGIN = 'https://nutrilogix-ai.com'
export const DEFAULT_IMAGE = `${SITE_ORIGIN}/assets/images/icon.png`
export const DEFAULT_KEYWORDS = 'nutrition app, food tracking, AI food analysis, calorie tracker, macro tracking'

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function toCanonicalPath(pathname) {
  if (!pathname) return '/'
  const pathOnly = pathname.split('?')[0].split('#')[0]
  if (pathOnly === '' || pathOnly === '/') return '/'
  const stripped = pathOnly.replace(/\/+$/, '')
  return stripped.startsWith('/') ? stripped : `/${stripped}`
}

export function canonicalUrl(pathname) {
  return `${SITE_ORIGIN}${toCanonicalPath(pathname)}`
}

export function absolutizeUrl(url) {
  if (!url || typeof url !== 'string') return ''
  if (url.startsWith('https://') || url.startsWith('http://')) return url
  if (url.startsWith('//')) return `https:${url}`
  if (url.startsWith('/')) return `${SITE_ORIGIN}${url}`
  return `${SITE_ORIGIN}/${url}`
}

export function buildHeadModel({
  title,
  description,
  image,
  type = 'website',
  publishedTime,
  authorName,
  keywords,
  pathname,
  noindex = false,
}) {
  const path = toCanonicalPath(pathname || '/')
  const shareImage = absolutizeUrl(image) || DEFAULT_IMAGE
  const isArticle = type === 'article'
  return {
    title: title || 'Nutrilogix',
    description: description || '',
    image: shareImage,
    type: isArticle ? 'article' : 'website',
    url: `${SITE_ORIGIN}${path}`,
    publishedTime: publishedTime || '',
    authorName: isArticle ? (authorName || '') : (authorName || 'Nutrilogix'),
    keywords: keywords || (path === '/' ? DEFAULT_KEYWORDS : ''),
    noindex: !!noindex,
  }
}

export function enrichHeadFromBlogPosting(head, posting) {
  if (!posting) return head
  const authorName = typeof posting.author === 'string'
    ? posting.author
    : posting.author?.name || head.authorName
  const rawImage = Array.isArray(posting.image) ? posting.image[0] : posting.image
  const imageUrl = absolutizeUrl(typeof rawImage === 'string' ? rawImage : rawImage?.url)
  const next = {
    ...head,
    type: 'article',
    publishedTime: posting.datePublished || head.publishedTime,
    authorName: authorName || head.authorName,
  }
  if (imageUrl && (!head.image || head.image === DEFAULT_IMAGE)) {
    next.image = imageUrl
  }
  if (!next.description && posting.description) {
    next.description = String(posting.description)
  }
  return next
}

export function extractBlogPosting(html) {
  if (!html) return null
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let match = re.exec(html)
  while (match) {
    try {
      const data = JSON.parse(match[1])
      const nodes = Array.isArray(data) ? data : data['@graph'] ? data['@graph'] : [data]
      for (const node of nodes) {
        const kind = node?.['@type']
        const types = Array.isArray(kind) ? kind : [kind]
        if (types.includes('BlogPosting') || types.includes('Article')) return node
      }
    } catch {
      // Ignore unrelated or malformed JSON-LD blocks.
    }
    match = re.exec(html)
  }
  return null
}

function metaTag(attr, name, content) {
  if (content == null || content === '') return ''
  return `<meta ${attr}="${escapeHtml(name)}" content="${escapeHtml(content)}" />`
}

export function serializeHead(head) {
  const lines = [
    `<title>${escapeHtml(head.title)}</title>`,
    metaTag('name', 'description', head.description),
  ]
  if (!head.noindex) {
    lines.push(`<link rel="canonical" href="${escapeHtml(head.url)}" />`)
  }
  lines.push(metaTag('name', 'keywords', head.keywords))
  lines.push(metaTag('name', 'author', head.authorName))
  if (head.noindex) lines.push(metaTag('name', 'robots', 'noindex'))
  lines.push(metaTag('property', 'og:title', head.title))
  lines.push(metaTag('property', 'og:description', head.description))
  if (!head.noindex) lines.push(metaTag('property', 'og:url', head.url))
  lines.push(metaTag('property', 'og:type', head.type || 'website'))
  lines.push(metaTag('property', 'og:image', head.image))
  if (head.image === DEFAULT_IMAGE) {
    lines.push(metaTag('property', 'og:image:type', 'image/png'))
    lines.push(metaTag('property', 'og:image:width', '500'))
    lines.push(metaTag('property', 'og:image:height', '500'))
  }
  if (head.type === 'article') {
    lines.push(metaTag('property', 'article:published_time', head.publishedTime))
    lines.push(metaTag('property', 'article:author', head.authorName))
  }
  lines.push(metaTag('name', 'twitter:card', 'summary_large_image'))
  lines.push(metaTag('name', 'twitter:title', head.title))
  lines.push(metaTag('name', 'twitter:description', head.description))
  lines.push(metaTag('name', 'twitter:image', head.image))
  if (!head.noindex) lines.push(metaTag('name', 'twitter:url', head.url))
  return lines.filter(Boolean).join('\n    ')
}
