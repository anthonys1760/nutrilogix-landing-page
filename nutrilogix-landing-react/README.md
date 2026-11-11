# React + Vite

## Weekly blog

The site blog is drafted by `.github/workflows/weekly-blog.yml` in the repository root (GitHub does not run workflows nested in this folder). Every Thursday at 14:00 UTC — about 9:00 AM EST / 10:00 AM EDT — it asks xAI Grok for one post, runs `npm ci && npm run build` so the post prerenders, then opens a pull request from `blog/<date>-<slug>` into `master`. It does not push to `master`.

Before that workflow can succeed, add a repository Actions secret named `XAI_API_KEY` (an xAI API key). Optional Actions variable `BLOG_MODEL` overrides the model; the default is `grok-4.7`. The generator does not use `OPENROUTER_API_KEY`.

Preview the chosen topic and the API request locally, without calling xAI or needing a key:

```bash
node scripts/generate-blog-post.mjs --dry-run
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
