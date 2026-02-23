import { test, expect } from '../fixtures/auth.fixture';
import { mockSearchSongs } from '../mocks/handlers';

test.describe('Music Search', () => {
  test('renders search input on home page', async ({ authenticatedPage: page }) => {
    await page.goto('/');
    await expect(page.getByTestId('music-search-input')).toBeVisible();
  });

  test('displays search results', async ({ authenticatedPage: page }) => {
    await page.goto('/');
    await page.getByTestId('music-search-input').fill('muse');

    await expect(page.getByTestId('song-list')).toBeVisible();
    await expect(page.getByTestId('song-101')).toBeVisible();
    await expect(page.getByTestId('song-202')).toBeVisible();
    await expect(page.getByTestId('song-303')).toBeVisible();
  });

  test('shows song info in results', async ({ authenticatedPage: page }) => {
    await page.goto('/');
    await page.getByTestId('music-search-input').fill('muse');

    await expect(page.getByTestId('song-list')).toBeVisible();
    await expect(page.getByText('Starlight')).toBeVisible();
    await expect(page.getByText('Muse').first()).toBeVisible();
  });

  test('shows empty state for no results', async ({ authenticatedPage: page }) => {
    await mockSearchSongs(page, []);
    await page.goto('/');
    await page.getByTestId('music-search-input').fill('zzzznotfound');

    await expect(page.getByTestId('empty-state')).toBeVisible();
  });
});
