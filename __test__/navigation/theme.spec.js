import { test, expect } from '../fixtures/auth.fixture';
import { THEME_KEY } from '../mocks/data';

test.describe('Theme Toggle', () => {
  test('theme toggle button is visible', async ({ authenticatedPage: page }) => {
    await page.goto('/');
    await expect(page.getByTestId('theme-toggle')).toBeVisible();
  });

  test('clicking toggle changes background color', async ({ authenticatedPage: page }) => {
    await page.goto('/');

    const getBg = () => page.evaluate(() => getComputedStyle(document.body).getPropertyValue('--musica-bg').trim());

    const before = await getBg();
    await page.getByTestId('theme-toggle').click();
    const after = await getBg();

    expect(before).not.toBe(after);
  });

  test('theme persists in localStorage', async ({ authenticatedPage: page }) => {
    await page.goto('/');
    await page.getByTestId('theme-toggle').click();

    const theme = await page.evaluate(({ key }) => localStorage.getItem(key), { key: THEME_KEY });
    expect(theme).toBeTruthy();
  });

  test('theme toggle is available on login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByTestId('theme-toggle')).toBeVisible();
  });
});
