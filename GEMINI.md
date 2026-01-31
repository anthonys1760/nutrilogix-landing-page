# Project Context: Nutrilogix Landing Page

## Overview
This repository contains the landing page for **Nutrilogix**, an AI-powered food nutrition analysis app. It appears to be in a transition or hybrid state, consisting of two distinct parts:
1.  **Root Static Site:** A traditional HTML/CSS/JS landing page located in the root directory.
2.  **React Application:** A modern React-based version of the landing page located in the `nutrilogix-landing-react/` subdirectory, using Vite as the build tool.

## Directory Structure
```
/
├── index.html                  # Entry point for the static landing page
├── blog.html, blog-post*.html  # Static blog pages
├── assets/                     # Shared static assets (images)
└── nutrilogix-landing-react/   # The modern React application
    ├── src/                    # React source code
    ├── public/                 # Public assets for the React app
    ├── package.json            # Dependencies and scripts
    └── vite.config.js          # Vite configuration
```

## 1. Static Site (Root)
The root directory contains a standalone static website.
-   **Entry Point:** `index.html`
-   **Styling:** CSS is embedded directly in `index.html` (no separate CSS files observed in the top level, though `assets` might contain some).
-   **Features:**
    -   Responsive design.
    -   Google Analytics integration (G-THVC3X36YN).
    -   Formspree integration for the "Early Access" signup form.

## 2. React Application (`nutrilogix-landing-react/`)
This is a Single Page Application (SPA) built with React 19 and Vite.

### Key Technologies
-   **Framework:** React 19
-   **Build Tool:** Vite
-   **Routing:** React Router DOM (`react-router-dom`)
-   **Linting:** ESLint

### Development & Commands
All commands must be run from the `nutrilogix-landing-react/` directory.

| Action | Command | Description |
| :--- | :--- | :--- |
| **Install Dependencies** | `npm install` | Install project dependencies. |
| **Start Dev Server** | `npm run dev` | Starts the development server (usually at `http://localhost:5173`). |
| **Build for Production** | `npm run build` | Builds the app for production to the `dist` folder. |
| **Preview Build** | `npm run preview` | Locally preview the production build. |
| **Lint Code** | `npm run lint` | Runs ESLint to check for code quality issues. |

## Development Conventions
-   **Hybrid State:** Be aware that changes to the root `index.html` do **not** affect the React app, and vice-versa. Clarify with the user which version they intend to work on.
-   **React Best Practices:**
    -   The React app follows standard Vite + React patterns.
    -   Components should be functional and use Hooks.
    -   Styling appears to be CSS-based (importing `.css` files).
