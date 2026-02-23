import { test as base, expect } from '@playwright/test';
import { TEST_TOKEN, TOKEN_KEY, API_SONGS } from '../mocks/data';
import { mockLibrary, mockSearchSongs } from '../mocks/handlers';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.evaluate(({ key, token }) => localStorage.setItem(key, token), { key: TOKEN_KEY, token: TEST_TOKEN });

    await mockLibrary(page);
    await mockSearchSongs(page, API_SONGS);

    await use(page);

    await page.evaluate(({ key }) => localStorage.removeItem(key), { key: TOKEN_KEY });
  }
});

export { expect };
