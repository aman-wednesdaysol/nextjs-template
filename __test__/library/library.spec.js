import { test, expect } from '../fixtures/auth.fixture';
import { mockLibrary, mockTrackDetail } from '../mocks/handlers';
import { API_SONG_1, API_SONG_2 } from '../mocks/data';

test.describe('Library / Favorites Page', () => {
  test('shows empty library message', async ({ authenticatedPage: page }) => {
    await page.goto('/library');
    await expect(page.getByTestId('empty-library')).toBeVisible();
  });

  test('shows liked songs', async ({ authenticatedPage: page }) => {
    await mockLibrary(page, [API_SONG_1, API_SONG_2]);
    await page.goto('/library');

    await expect(page.getByTestId('song-list')).toBeVisible();
    await expect(page.getByTestId('song-101')).toBeVisible();
    await expect(page.getByTestId('song-202')).toBeVisible();
  });

  test('shows song details in library', async ({ authenticatedPage: page }) => {
    await mockLibrary(page, [API_SONG_1]);
    await page.goto('/library');

    await expect(page.getByText('Starlight')).toBeVisible();
    await expect(page.getByText('Muse')).toBeVisible();
  });

  test('song card click navigates to track detail', async ({ authenticatedPage: page }) => {
    await mockLibrary(page, [API_SONG_1]);
    await mockTrackDetail(page, API_SONG_1);
    await page.goto('/library');

    await expect(page.getByTestId('song-101')).toBeVisible();
    await page.getByTestId('song-101').click();

    await expect(page).toHaveURL(/\/track\/101/);
  });
});
