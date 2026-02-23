import { test, expect } from '@playwright/test';

test.describe('Auth Guard', () => {
  test('redirects / to /login without token', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/login/);
  });

  test('redirects /library to /login without token', async ({ page }) => {
    await page.goto('/library');
    await expect(page).toHaveURL(/\/login/);
  });

  test('redirects /track/101 to /login without token', async ({ page }) => {
    await page.goto('/track/101');
    await expect(page).toHaveURL(/\/login/);
  });
});
