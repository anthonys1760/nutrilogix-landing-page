import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applyDocumentHead } from '../applyDocumentHead.js'
import { captureHead } from '../headStore.js'
import {
  buildHeadModel,
  enrichHeadFromBlogPosting,
  extractBlogPosting,
} from '../seoHead.js'

export default function SEO({
  title,
  description,
  image,
  type = 'website',
  publishedTime,
  authorName,
  keywords,
  noindex = false,
}) {
  const location = useLocation()
  const head = buildHeadModel({
    title,
    description,
    image,
    type,
    publishedTime,
    authorName,
    keywords,
    pathname: location.pathname,
    noindex,
  })

  if (typeof document === 'undefined') {
    captureHead(head)
  }

  useEffect(() => {
    const model = buildHeadModel({
      title,
      description,
      image,
      type,
      publishedTime,
      authorName,
      keywords,
      pathname: location.pathname,
      noindex,
    })
    const onBlogIndex = location.pathname === '/blog' || location.pathname === '/blog/'
    const shouldReadPosting = !onBlogIndex && (model.type === 'article' || location.pathname.startsWith('/blog/'))
    const posting = shouldReadPosting ? extractBlogPosting(document.documentElement.innerHTML) : null
    applyDocumentHead(posting ? enrichHeadFromBlogPosting(model, posting) : model)
  }, [title, description, image, type, publishedTime, authorName, keywords, noindex, location.pathname])

  return null
}
