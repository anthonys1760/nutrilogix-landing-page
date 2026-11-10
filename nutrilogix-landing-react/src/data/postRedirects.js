/**
 * Retired blog slugs that should permanently point at the kept article.
 * Keys are removed URLs. Values are the canonical slug that stays published.
 * GitHub Pages cannot send a 301, so these are also prerendered as
 * noindex refresh pages and handled by the client router.
 */
export const postRedirects = {
  'thermic-effect-of-food': 'thermic-effect-of-food-metabolism',
  'autophagy-fasting-cellular-cleanup-science': 'autophagy-fasting-cellular-cleanup-metabolism',
  'probiotics-vs-prebiotics-gut-health-science': 'probiotics-prebiotics-microbiome-complete-guide',
  'sleep-deprivation-hunger-hormones-weight-loss': 'sleep-and-nutrition',
  'the-end-of-manual-logging': 'hidden-cost-manual-logging',
  'science-of-hydration': 'hydration-metabolism-water-fat-loss',
}

export function blogRedirectPath(pathname) {
  if (typeof pathname !== 'string') return null
  const match = pathname.match(/^\/blog\/([^/?#]+)\/?$/)
  if (!match) return null
  const target = postRedirects[match[1]]
  return target ? `/blog/${target}` : null
}
