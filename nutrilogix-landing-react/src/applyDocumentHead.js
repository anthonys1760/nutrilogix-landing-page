import { DEFAULT_IMAGE } from './seoHead.js'

function setMeta(selector, content) {
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    if (selector.includes('[property=')) {
      el.setAttribute('property', selector.match(/property="([^"]+)"/)[1])
    } else {
      el.setAttribute('name', selector.match(/name="([^"]+)"/)[1])
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function removeMeta(selector) {
  const el = document.querySelector(selector)
  if (el) el.remove()
}

export function applyDocumentHead(head) {
  document.title = head.title

  if (head.description) setMeta('meta[name="description"]', head.description)
  else removeMeta('meta[name="description"]')

  if (head.noindex) {
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.remove()
    setMeta('meta[name="robots"]', 'noindex')
    removeMeta('meta[property="og:url"]')
    removeMeta('meta[name="twitter:url"]')
  } else {
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', head.url)
    removeMeta('meta[name="robots"]')
    setMeta('meta[property="og:url"]', head.url)
    setMeta('meta[name="twitter:url"]', head.url)
  }

  setMeta('meta[property="og:title"]', head.title)
  setMeta('meta[property="og:description"]', head.description)
  setMeta('meta[property="og:type"]', head.type)
  setMeta('meta[property="og:image"]', head.image)
  setMeta('meta[name="twitter:card"]', 'summary_large_image')
  setMeta('meta[name="twitter:title"]', head.title)
  setMeta('meta[name="twitter:description"]', head.description)
  setMeta('meta[name="twitter:image"]', head.image)

  if (head.keywords) setMeta('meta[name="keywords"]', head.keywords)
  else removeMeta('meta[name="keywords"]')

  if (head.authorName) setMeta('meta[name="author"]', head.authorName)
  else removeMeta('meta[name="author"]')

  if (head.image === DEFAULT_IMAGE) {
    setMeta('meta[property="og:image:type"]', 'image/png')
    setMeta('meta[property="og:image:width"]', '500')
    setMeta('meta[property="og:image:height"]', '500')
  } else {
    removeMeta('meta[property="og:image:type"]')
    removeMeta('meta[property="og:image:width"]')
    removeMeta('meta[property="og:image:height"]')
  }

  if (head.type === 'article') {
    if (head.publishedTime) setMeta('meta[property="article:published_time"]', head.publishedTime)
    else removeMeta('meta[property="article:published_time"]')
    if (head.authorName) setMeta('meta[property="article:author"]', head.authorName)
    else removeMeta('meta[property="article:author"]')
  } else {
    removeMeta('meta[property="article:published_time"]')
    removeMeta('meta[property="article:author"]')
  }
}
