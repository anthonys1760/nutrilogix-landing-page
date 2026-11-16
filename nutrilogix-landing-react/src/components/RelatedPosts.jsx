import { Link } from 'react-router-dom'
import { relatedPostsFor } from '../posts'

export default function RelatedPosts({ slug }) {
  const posts = relatedPostsFor(slug)
  if (posts.length === 0) {
    return (
      <nav className="related-posts" aria-label="Related posts">
        <p className="related-posts-index">
          <Link to="/blog">Back to all articles</Link>
        </p>
      </nav>
    )
  }

  return (
    <nav className="related-posts" aria-label="Related posts">
      <h2>Related posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <p className="related-posts-index">
        <Link to="/blog">Back to all articles</Link>
      </p>
    </nav>
  )
}
