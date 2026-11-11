# Project Context: Nutrilogix Landing Page

## Overview
This repository hosts the **Nutrilogix** landing page, an AI-powered food nutrition analysis app.
The project has migrated to a modern **React Application** located in the `nutrilogix-landing-react/` subdirectory, using Vite as the build tool.

*Note: The root directory contains legacy static HTML files (`index.html`, `blog.html`) which are being superseded by the React app.*

## Directory Structure
```
/
├── .github/workflows/deploy.yml # GitHub Actions deployment script
├── nutrilogix-landing-react/    # The active React application
│   ├── src/                     # React source code (Components, Pages)
│   ├── public/                  # Static assets (images, CNAME)
│   ├── index.html               # React app entry point
│   ├── package.json             # Dependencies and scripts
│   └── vite.config.js           # Vite configuration
└── (legacy files: index.html, assets/, etc.)
```

## React Application (`nutrilogix-landing-react/`)
This is a Single Page Application (SPA) built with React 19 and Vite.

### Key Technologies
-   **Framework:** React 19
-   **Build Tool:** Vite
-   **Routing:** `HashRouter` (via `react-router-dom`) - Used for compatibility with static hosting.
-   **Deployment:** GitHub Actions -> GitHub Pages (`gh-pages` branch).

### Development & Commands
All commands must be run from the `nutrilogix-landing-react/` directory.

| Action | Command | Description |
| :--- | :--- | :--- |
| **Install Dependencies** | `npm install` | Install project dependencies. |
| **Start Dev Server** | `npm run dev` | Starts the development server. |
| **Build for Production** | `npm run build` | Builds the app to the `dist` folder. |
| **Preview Build** | `npm run preview` | Locally preview the production build. |

## Deployment Architecture
The site is deployed to GitHub Pages automatically via GitHub Actions.

1.  **Workflow:** `.github/workflows/deploy.yml` triggers on push to `master`.
2.  **Process:**
    -   Installs dependencies and builds the React app.
    -   Deploys the `nutrilogix-landing-react/dist` folder to the `gh-pages` branch.
3.  **Custom Domain:**
    -   The `CNAME` file is located in `nutrilogix-landing-react/public/CNAME`.
    -   Vite copies this file to the build output (`dist/`) automatically.
    -   This prevents the custom domain from breaking during deployment updates.

## Weekly blog

`.github/workflows/weekly-blog.yml` drafts one post every Thursday at 14:00 UTC and opens a pull request into `master`. It does not push to `master`. The generator calls xAI and needs the repository Actions secret `XAI_API_KEY`. Optional variable `BLOG_MODEL` overrides the default model `grok-4.7`. `OPENROUTER_API_KEY` is not used.

Preview the topic and request without calling the API:

```bash
cd nutrilogix-landing-react && node scripts/generate-blog-post.mjs --dry-run
```

## Critical Conventions
-   **Routing:** The app uses `BrowserRouter`. `npm run build` prerenders `/blog/<slug>` (and the other public routes) to real HTML files, and retired slugs are prerendered as redirects.
-   **Images:** Assets should be placed in `nutrilogix-landing-react/public/assets/` and referenced via absolute paths (e.g., `/assets/images/file.jpg`).
-   **Styles:** Global styles and variables are in `index.css`. Use the established CSS variables (e.g., `--primary`, `--text-main`) for consistency.