import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

export default function SEO({ title, description, image, type = 'website', publishedTime, authorName, keywords }) {
  const location = useLocation();
  const url = `https://nutrilogix.app${location.pathname}`;

  useEffect(() => {
    document.title = title;

    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[property="og:type"]', type)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)

    if (image) {
      setMeta('meta[property="og:image"]', image)
      setMeta('meta[name="twitter:image"]', image)
    }

    if (type === 'article') {
      // Upgrade Twitter card to show large image for blog posts
      setMeta('meta[name="twitter:card"]', 'summary_large_image')

      // Article-specific OG tags
      if (publishedTime) setMeta('meta[property="article:published_time"]', publishedTime)
      if (authorName) {
        setMeta('meta[property="article:author"]', authorName)
        setMeta('meta[name="author"]', authorName)
      }
      if (keywords) setMeta('meta[name="keywords"]', keywords)
    } else {
      // Reset to defaults for non-article pages
      setMeta('meta[name="twitter:card"]', 'summary')
      setMeta('meta[name="author"]', 'Nutrilogix')
      removeMeta('meta[property="article:published_time"]')
      removeMeta('meta[property="article:author"]')
    }
  }, [title, description, image, type, url, publishedTime, authorName, keywords]);

  return null;
}
