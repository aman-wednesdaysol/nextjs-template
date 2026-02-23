import { test, expect } from '../fixtures/auth.fixture';
import { mockLikeSong, mockUnlikeSong, mockLibrary } from '../mocks/handlers';
import { API_SONG_1 } from '../mocks/data';

test.describe('Like / Unlike Songs', () => {
  test.beforeEach(async ({ authenticatedPage: page }) => {
    await mockLikeSong(page);
    await mockUnlikeSong(page);
    await page.goto('/');
    await page.getByTestId('music-search-input').fill('muse');
    await expect(page.getByTestId('song-list')).toBeVisible();
  });

  test('heart buttons are visible for each song', async ({ authenticatedPage: page }) => {
    const hearts = page.getByTestId('heart-button');
    await expect(hearts.first()).toBeVisible();
    expect(await hearts.count()).toBe(3);
  });

  test('clicking heart likes a song', async ({ authenticatedPage: page }) => {
    const heart = page.getByTestId('song-101').getByTestId('heart-button');
    await expect(heart).toHaveAttribute('aria-label', 'Like song');

    await heart.click();
    await expect(heart).toHaveAttribute('aria-label', 'Unlike song');
  });

  test('clicking liked heart unlikes a song', async ({ authenticatedPage: page }) => {
    await mockLibrary(page, [API_SONG_1]);
    await page.reload();
    await page.getByTestId('music-search-input').fill('muse');
    await expect(page.getByTestId('song-list')).toBeVisible();

    const heart = page.getByTestId('song-101').getByTestId('heart-button');
    await expect(heart).toHaveAttribute('aria-label', 'Unlike song');

    await heart.click();
    await expect(heart).toHaveAttribute('aria-label', 'Like song');
  });
});
