import { test, expect } from '../fixtures/auth.fixture';
import { mockTrackDetail, mockTrackDetailError } from '../mocks/handlers';
import { API_SONG_1 } from '../mocks/data';

test.describe('Track Detail Page', () => {
  test('displays track info', async ({ authenticatedPage: page }) => {
    await mockTrackDetail(page, API_SONG_1);
    await page.goto('/track/101');

    await expect(page.getByTestId('track-info')).toBeVisible();
    await expect(page.getByText('Starlight')).toBeVisible();
    await expect(page.getByText('Muse')).toBeVisible();
    await expect(page.getByText('Black Holes')).toBeVisible();
  });

  test('shows metadata tags', async ({ authenticatedPage: page }) => {
    await mockTrackDetail(page, API_SONG_1);
    await page.goto('/track/101');

    await expect(page.getByTestId('tag-genre')).toHaveText('Alternative');
    await expect(page.getByTestId('tag-duration')).toHaveText('4:00');
    await expect(page.getByTestId('tag-release')).toHaveText('2024');
    await expect(page.getByTestId('tag-price')).toContainText('1.29');
  });

  test('shows store link with correct href', async ({ authenticatedPage: page }) => {
    await mockTrackDetail(page, API_SONG_1);
    await page.goto('/track/101');

    const link = page.getByTestId('store-link');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://music.apple.com/track/101');
  });

  test('back button navigates back', async ({ authenticatedPage: page }) => {
    await page.goto('/');
    await mockTrackDetail(page, API_SONG_1);
    await page.goto('/track/101');

    await page.getByTestId('back-button').click();
    await expect(page).toHaveURL('/');
  });

  test('shows error state on API failure', async ({ authenticatedPage: page }) => {
    await mockTrackDetailError(page);
    await page.goto('/track/999');

    await expect(page.getByTestId('error-state')).toBeVisible();
  });
});
