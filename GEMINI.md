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

## Critical Conventions
-   **Routing:** Always use `HashRouter` in `main.jsx`. `BrowserRouter` will fail on GitHub Pages refresh because the static server cannot handle client-side routes (e.g., `/blog`).
-   **Images:** Assets should be placed in `nutrilogix-landing-react/public/assets/` and referenced via absolute paths (e.g., `/assets/images/file.jpg`).
-   **Styles:** Global styles and variables are in `index.css`. Use the established CSS variables (e.g., `--primary`, `--text-main`) for consistency.