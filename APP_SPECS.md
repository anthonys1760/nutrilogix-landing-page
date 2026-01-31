# Nutrilogix AI 2026 - Project Specs

## Project Overview
Nutrilogix AI 2026 is a comprehensive nutrition and fitness tracking mobile application built with React Native and Expo. It leverages AI (via Anthropic/OpenRouter) for features like food analysis and scanning, and integrates with Supabase for backend services (authentication, database). It also includes HealthKit integration and analytics via PostHog.

## Key Features
- **Nutrition Tracking:** Log meals, scan barcodes/labels, and track calories/macros.
- **AI Integration:** "AIScanningOverlay" and "FoodAnalysisOverlay" suggest AI-powered food recognition.
- **Health Integration:** `react-native-health` implies integration with Apple HealthKit.
- **Analytics:** PostHog integration for user session and event tracking.
- **Authentication:** Supabase Auth integration.

## Tech Stack
- **Framework:** React Native (0.81.5), Expo (~54.0.31)
- **Language:** JavaScript / TypeScript
- **Backend:** Supabase (PostgreSQL, Auth)
- **AI:** Anthropic SDK, OpenRouter
- **Analytics:** PostHog
- **State Management:** React Hooks
- **Navigation:** Conditional rendering / Expo Router

## Project Structure
- **Root:** Configuration (app.config.js, eas.json), entry (App.js), main screens.
- **supabase/:** Config and migrations.
- **migrations/:** SQL schema (profiles, meals, weight_history, saved_foods, shopping_lists, exercise_logs).
- **functions/:** Edge functions (e.g., `fridge-scan`).
- **assets/:** Images and icons.

## Database Schema (Inferred)
- `profiles`: User profiles.
- `weight_history`: Tracking user weight over time.
- `saved_foods`: User's saved food items.
- `shopping_lists`: Shopping list functionality.
- `exercise_logs`: Workout tracking (with HealthKit ID support).

## Development Conventions
- **Styling:** Inline styles.
- **Components:** Functional components with Hooks.
- **Naming:** PascalCase for components, camelCase for utilities.
