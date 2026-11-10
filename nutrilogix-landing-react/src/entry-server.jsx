import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import { consumeHead } from './headStore.js'

export function render(url) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
  const head = consumeHead()
  if (!head) {
    throw new Error(`No SEO head captured for ${url}`)
  }
  return { html, head }
}
