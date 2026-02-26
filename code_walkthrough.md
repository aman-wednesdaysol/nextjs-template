# Code Walkthrough - Musica Application

This document provides a comprehensive technical overview of the Musica application. It is designed for developers who are new to the codebase to quickly understand the architecture, patterns, and tools used.

---

## 🚀 Technology Stack

- **Framework**: [Next.js (v14)](https://nextjs.org/)
- **State Management**: [Redux](https://redux.js.org/) with [Redux-Saga](https://redux-saga.js.org/) for side effects.
- **Styling**: [Emotion](https://emotion.sh/) & [Styled-Components](https://styled-components.com/).
- **API Client**: [Apisauce](https://github.com/infinitered/apisauce) (Axios-based).
- **Analytics & A/B Testing**: [PostHog](https://posthog.com/).
- **Testing**: [Jest](https://jestjs.io/) (Unit) & [Playwright](https://playwright.dev/) (E2E).

---

## 🏗️ Architecture & Design Patterns

The application follows a **Container/Component** pattern, which separates business logic and state from pure presentation.

### 1. Containers (`app/containers/`)
Containers are the "brains" of the application. Each container manages its own state and side effects.
- **`reducer.js`**: Handles state updates using `reduxsauce`.
- **`saga.js`**: Manages asynchronous flows (API calls, navigation) using `redux-saga`.
- **`selectors.js`**: Provides memoized access to the Redux store using `reselect`.
- **`index.js`**: The main entry point for the container, usually connected to Redux.

### 2. Components (`app/components/`)
Components are focused on presentation. They receive data and callbacks via props.
- **`styled/`**: Contains raw UI building blocks (buttons, inputs, etc.) built with Emotion.
- **Functional Components**: Located in their own folders, e.g., `app/components/AudioPlayer`.

### 3. Dynamic Injection
To keep the initial bundle small, the app supports dynamic injection of reducers and sagas. This is handled by `injectSaga.js` and `sagaInjectors.js`.

---

## 📂 Key Directories

- `app/services/`: Defines API endpoints and base configuration for network requests.
- `app/utils/`: Shared utilities, including `apiUtils.js`, `authStorage.js`, and `testUtils.js`.
- `app/themes/`: Global theme configuration (colors, fonts, etc.).
- `pages/`: File-based routing for Next.js.
- `environments/`: Environment-specific variables managed via `env-cmd`.

---

## 🧪 Testing Strategy

The project maintains a strict testing policy with high coverage requirements (90%+).

### Unit Testing (Jest)
- Co-located with code in `tests/` folders.
- Use `renderProvider` from `app/utils/testUtils.js` to render components with Redux/Theme context.
- Targets: Components, Reducers, Sagas, Selectors.

### E2E Testing (Playwright)
- Located in the `__test__/` directory.
- Covers critical user flows: Login, Search, Song Playback.
- Run with `npx playwright test`.

---

## 📊 Analytics & Experiments

- **PostHog Integration**: Metrics are initialized in `pages/_app.js`.
- **A/B Testing**: Use `posthog.getFeatureFlag('flag-key')` to implement experiments.
- **Tracking**: exposure events (`$feature_flag_called`) and custom conversion events (e.g., `google_signin_clicked`) are captured automatically in relevant flows.

---

## 🛠️ Development Commands

- `npm run start:dev`: Start development server.
- `npm run test`: Run unit tests and coverage.
- `npm run test:playwright`: Run E2E tests.
- `npm run build:prod`: Build for production.
