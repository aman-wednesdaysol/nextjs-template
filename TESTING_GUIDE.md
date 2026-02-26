# Musica Testing Guide

This document provides a detailed overview of the testing strategy for the Musica application, including unit tests, end-to-end (E2E) tests, and coverage requirements.

---

## 🧪 Unit Testing (Jest & React Testing Library)

Unit tests focus on individual components, containers, and utility functions. They are co-located with the code they test in `tests/` directories.

### 📁 Structure
- **Components**: `app/components/[ComponentName]/tests/index.test.js`
- **Containers**: `app/containers/[ContainerName]/tests/`
    - `index.test.js` - Tests the main container component.
    - `reducer.test.js` - Verifies state transitions.
    - `saga.test.js` - Verifies async side effects (API calls).
    - `selectors.test.js` - Verifies memoized data retrieval.

### 🛠️ Key Mocks & Helpers
- **`renderProvider`**: Located in `app/utils/testUtils.js`. Always use this to render components that require Redux, Theme, or Intl context.
- **Global Mocks**: `jest.setup.js` handles common mocks like `next/router` and `matchMedia`.
- **Emotion Serialize**: Snapshots are serialized with `@emotion/jest` to include styled-component styles.

### 🏃 Running Unit Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run a specific test file
npm run test -- path/to/file.test.js
```

---

## 🎭 End-to-End (E2E) Testing (Playwright)

E2E tests verify complete user flows by interacting with the application in a real browser.

### 📁 Structure
Tests are located in the top-level `__test__` directory:
- `__test__/auth/`: Login and Signup flows.
- `__test__/music/`: Search, playback, and navigation flows.
- `__test__/fixtures/`: Mock data for tests.

### 🛠️ Configuration
- **Config**: `playwright.config.js`
- **Base URL**: Defaults to `http://127.0.0.1:3000`.
- **Browsers**: Chromium, Firefox, Webkit (Safari).
- **Web Server**: Automatically starts the dev server (`npm run start:dev`) before running tests in CI.

### 🏃 Running E2E Tests
```bash
# Run all E2E tests
npx playwright test

# Open Playwright UI
npm run test:playwright:ui

# Show report
npm run test:playwright:report
```

---

## 📊 Test Coverage

The project enforces strict code coverage thresholds to ensure high reliability.

### 📈 Current Thresholds
Configured in `jest.config.js`:
- **Statements**: 90%
- **Branches**: 90%
- **Functions**: 89%
- **Lines**: 90%

### 🔍 Coverage Reports
Generated in the `coverage/` directory after running `npm run test`. You can view the HTML report by opening `coverage/lcov-report/index.html` in your browser.

---

## 🛠️ Performance & CI
- **CI Integration**: `npm run test:ci` runs Jest in CI mode.
- **Environment Variables**: Ensure `NEXT_PUBLIC_URL` is set correctly for Playwright tests, especially in CI environments.
