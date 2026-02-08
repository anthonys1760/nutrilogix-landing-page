# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Nutrilogix Landing Page** is a React-based marketing website for an AI-powered nutrition tracking mobile app. It's a single-page application (SPA) deployed as a static site to GitHub Pages at nutrilogix.app.

**Key Characteristics:**
- Client-side only (no backend)
- Marketing-focused with conversion goal (waitlist signup)
- Heavy on visual content (blog, testimonials, features)
- Uses hash-based routing for static hosting compatibility
- Custom CSS with CSS Variables (no CSS framework)

## Common Development Commands

```bash
# Start local development server (runs on localhost:5173)
npm run dev

# Build for production (creates dist/ directory)
npm run build

# Lint code with ESLint
npm run lint

# Preview the built production site locally
npm run preview

# Run a single test (if added in future)
npm test -- <test-file>
```

## Technology Stack

- **React** 19.1.1 - UI framework
- **Vite** 7.1.2 - Build tool and dev server
- **react-router-dom** 7.8.2 - Client-side routing (HashRouter)
- **ESLint** 9.33.0 - Code linting
- **Custom CSS** - No CSS framework (Bootstrap, Tailwind, etc.)
- **Google Analytics** - Integrated via gtag.js
- **Formspree** - Email form handling for waitlist

## Architecture & Code Structure

### Routing Map

All routes use hash-based URLs (e.g., `/#/blog`) for GitHub Pages compatibility.

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `src/pages/Home.jsx` | Main landing page with hero, features, testimonials |
| `/blog` | `src/pages/Blog.jsx` | Blog post listing (6 posts displayed) |
| `/blog/:slug` | `src/pages/BlogPost.jsx` | Individual blog post (slug-based) |
| `/privacy` | `src/pages/Privacy.jsx` | Privacy policy |
| `/terms` | `src/pages/Terms.jsx` | Terms of service |
| `*` | `src/pages/NotFound.jsx` | 404 page |

### Key Components

**`src/components/`** - Reusable UI components:
- **Header.jsx** - Navigation bar with mobile hamburger menu, smooth scroll links
- **Footer.jsx** - Multi-column footer with links and copyright
- **SEO.jsx** - Meta tag and title management (critical for SPA SEO)
- **CookieConsent.jsx** - Cookie banner with localStorage persistence

**`src/pages/`** - Route components:
- **Home.jsx** (28KB) - Largest component; includes hero, 6 feature cards, 4 feature sections with images, how-it-works, testimonials (6), FAQ, waitlist CTA
- **BlogPost.jsx** (21KB) - Dynamic blog rendering with fallback pattern; currently implements "science-of-satiety"
- **Blog.jsx** (9KB) - Grid of 6 blog post cards with metadata
- **Privacy.jsx**, **Terms.jsx**, **NotFound.jsx** - Static content pages

**App Root** (`src/App.jsx`):
- Sets up routing with `<HashRouter>` and `<Routes>`
- Renders Header, page content, Footer, CookieConsent wrapper

### Design System & Styling

**Approach:** CSS Variables in `src/index.css` + inline styles + utility classes

**Key CSS Variables** (update in `src/index.css`):
- Colors: `--primary: #0DC68B`, `--bg-dark: #0F1115`, `--text-main: #F5F6F7`, `--text-muted: #9CA3AF`
- Spacing: `--radius-sm: 8px`, `--radius-md: 16px`, `--radius-lg: 24px`
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Layout: `--max-width: 1200px`

**Utility Classes:**
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-white` - Button styles
- `.container` - Max-width wrapper
- `.section` - Full-width sections
- `.reveal`, `.reveal-delay-1/2/3` - Scroll-triggered animations via IntersectionObserver

**Current Pattern:** Heavy use of inline styles in components. Consider extracting repeated styles to `index.css` utility classes for better maintainability.

**Font:** Inter (Google Fonts, weights 300-700)

### State Management

**Approach:** React Hooks only (useState, useEffect, useParams, useLocation)
- **No Redux, Context API, or external state libraries** - Intentional for a landing page
- Local component state for: menu toggle (Header), cookie consent visibility, animations

### Blog Post Management

**Current Implementation:**
- Blog posts are hardcoded in `BlogPost.jsx` using slug-based conditional rendering
- Current posts: `science-of-satiety`, `the-end-of-manual-logging`, `hidden-dangers-ultra-processed`, `understanding-macros`, `ai-in-nutrition`, `meal-planning`, `7-minute-meal-prep`
- Blog cards and metadata are defined in `Blog.jsx`

**Adding a New Blog Post:**
1. Create post content in `BlogPost.jsx` with a new slug conditional
2. Add card entry to `Blog.jsx` with title, excerpt, featured image, author, date, read time
3. Add featured image to `public/assets/images/`
4. Include JSON-LD schema markup in BlogPost.jsx for SEO

### Data & Static Content

- **Testimonials** - Hardcoded in Home.jsx
- **FAQ items** - Hardcoded in Home.jsx
- **Feature cards** - Hardcoded in Home.jsx
- **Images** - All in `public/assets/images/`
- **No database or CMS** - All content is static/frontend

### Forms & External Services

**Waitlist Form:**
- Endpoint: `https://formspree.io/f/xkgjdpyd`
- Method: POST, opens in new tab
- Submission handled by Formspree (external service)

**Cookie Consent:**
- localStorage key: `"cookie-consent"`
- Single "Accept All" button
- Persists user choice

**Google Analytics:**
- Tracking ID: G-THVC3X36YN
- Integrated in `index.html`

## File Size Reference

- Home.jsx: 28KB (largest, consider refactoring)
- BlogPost.jsx: 21KB
- Blog.jsx: 9KB
- index.css: ~400 lines
- All other files: <3KB

## Git Commit Conventions

Follow conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `style:` - Styling changes
- `content:` - Content updates
- `docs:` - Documentation updates
- Example: `feat(blog): add 'Science of Satiety' post`

## SEO Considerations

- **Meta tags** - Managed dynamically by SEO.jsx component; all pages should use it
- **Structured data** - JSON-LD schema used in blog posts (BlogPosting type)
- **Social sharing** - Open Graph tags implemented
- **Sitemap/Robots** - Not currently implemented (consider adding for production)
- **Page titles** - Updated per page via SEO component
- **Favicon** - Set in index.html to app logo

## Performance Notes

**Current Optimizations:**
- Vite for fast bundling
- React 19 with built-in optimizations
- CSS Variables for efficient theming
- Fast Refresh in development

**Potential Improvements:**
- Refactor inline styles to CSS classes (improves maintainability and bundle size)
- Implement image lazy loading
- Optimize image assets (WebP format, responsive variants)
- Consider web font subsetting
- Extract blog content to data files or CMS

## Development Patterns

### Adding a New Page
1. Create component in `src/pages/` named like `MyPage.jsx`
2. Add route to `App.jsx`:
   ```jsx
   <Route path="/my-route" element={<MyPage />} />
   ```
3. Add navigation link in Header.jsx or Footer.jsx if needed
4. Wrap content with `<SEO title="..." description="..." />`

### Updating Styles
- **Global changes:** Edit CSS variables in `src/index.css`
- **New utility classes:** Add to `src/index.css`
- **Component-specific styles:** Current pattern is inline styles; consider extracting to classes

### Testing the Build
```bash
npm run build    # Create optimized bundle
npm run preview  # Serve dist/ locally to test
```

## Important Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Routes and layout structure |
| `src/index.css` | Global styles, CSS variables, utilities |
| `src/components/Header.jsx` | Navigation, mobile menu |
| `src/components/SEO.jsx` | Meta tag management (critical for SPA) |
| `src/pages/Home.jsx` | Main landing page |
| `vite.config.js` | Build and dev server config |
| `eslint.config.js` | Linting rules |
| `public/assets/images/` | All image assets |
| `index.html` | HTML entry point (Google Analytics script here) |

## Deployment

- **Hosting:** GitHub Pages
- **Domain:** nutrilogix.app (via CNAME file)
- **Build:** Run `npm run build` to create optimized dist/
- **Process:** Likely automated via GitHub Actions on push to main/master

## Common Gotchas

1. **Hash-based routing** - URLs will be `/#/path` not `/path`. This is intentional for GitHub Pages static hosting.
2. **Blog posts are hardcoded** - Adding a new post requires code changes to BlogPost.jsx; not database-driven.
3. **State doesn't persist across page reloads** - By design; refresh loses UI state (except localStorage for cookies).
4. **No build output in git** - `dist/` is gitignored; run `npm run build` locally after pulling.
5. **Image assets must be in public/** - Assets in `src/` are bundled; static files belong in `public/assets/`.
6. **Formspree form opens new tab** - Intentional design; no form success/error handling on current page.

## Maintenance Tasks

- **Update dependencies** - Run `npm update` regularly; check changelog for breaking changes
- **Lint before commits** - Run `npm run lint` to catch issues early
- **Test locally** - Always test locally with `npm run dev` and build with `npm run build` before pushing
- **Monitor Google Analytics** - Check G-THVC3X36YN dashboard for user behavior and conversion rates
- **Blog SEO** - Ensure new blog posts include meta descriptions and schema markup

## Next Steps for Enhancement

- Extract repeated UI patterns to reusable components (testimonial card, feature card)
- Move inline styles in Home.jsx to CSS classes in index.css
- Consider adding TypeScript for type safety
- Implement image lazy loading for better performance
- Add error boundaries for better error handling
- Consider migrating blog content to structured data (JSON file or CMS)
