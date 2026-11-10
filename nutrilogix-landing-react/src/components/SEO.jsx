import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SITE_ORIGIN = 'https://nutrilogix-ai.com'
const DEFAULT_IMAGE = `${SITE_ORIGIN}/assets/images/icon.png`

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

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function SEO({ title, description, image, type = 'website', publishedTime, authorName, keywords }) {
  const location = useLocation();
  const url = `${SITE_ORIGIN}${location.pathname}`;
  const shareImage = image || DEFAULT_IMAGE

  useEffect(() => {
    document.title = title;

    setMeta('meta[name="description"]', description)
    setCanonical(url)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[property="og:type"]', type)
    setMeta('meta[property="og:image"]', shareImage)
    setMeta('meta[name="twitter:card"]', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
    setMeta('meta[name="twitter:image"]', shareImage)
    setMeta('meta[name="twitter:url"]', url)

    if (shareImage === DEFAULT_IMAGE) {
      setMeta('meta[property="og:image:width"]', '500')
      setMeta('meta[property="og:image:height"]', '500')
    } else {
      removeMeta('meta[property="og:image:width"]')
      removeMeta('meta[property="og:image:height"]')
    }

    if (type === 'article') {
      if (publishedTime) setMeta('meta[property="article:published_time"]', publishedTime)
      if (authorName) {
        setMeta('meta[property="article:author"]', authorName)
        setMeta('meta[name="author"]', authorName)
      }
      if (keywords) setMeta('meta[name="keywords"]', keywords)
    } else {
      setMeta('meta[name="author"]', 'Nutrilogix')
      removeMeta('meta[property="article:published_time"]')
      removeMeta('meta[property="article:author"]')
    }
  }, [title, description, shareImage, type, url, publishedTime, authorName, keywords]);

  return null;
}
