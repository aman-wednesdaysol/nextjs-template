import { test, expect } from '../fixtures/auth.fixture';
import { mockLibrary } from '../mocks/handlers';
import { TOKEN_KEY } from '../mocks/data';

test.describe('Navigation', () => {
  test('search nav link navigates to home', async ({ authenticatedPage: page }) => {
    await mockLibrary(page);
    await page.goto('/library');
    await page.getByTestId('nav-search').click();
    await expect(page).toHaveURL('/');
  });

  test('logout clears token and redirects to login', async ({ authenticatedPage: page }) => {
    await page.goto('/');
    await page.getByTestId('logout-button').click();

    await expect(page).toHaveURL(/\/login/);

    const token = await page.evaluate(({ key }) => localStorage.getItem(key), { key: TOKEN_KEY });
    expect(token).toBeNull();
  });
});
