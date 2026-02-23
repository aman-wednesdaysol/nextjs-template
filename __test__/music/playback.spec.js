import { test, expect } from '../fixtures/auth.fixture';

test.describe('Music Playback', () => {
  test.beforeEach(async ({ authenticatedPage: page }) => {
    await page.goto('/');
    await page.getByTestId('music-search-input').fill('muse');
    await expect(page.getByTestId('song-list')).toBeVisible();
  });

  test('clicking artwork play button shows audio player', async ({ authenticatedPage: page }) => {
    await page.getByTestId('song-101').getByTestId('artwork-play-btn').click();
    await expect(page.getByTestId('audio-player')).toBeVisible();
  });

  test('audio player displays current track info', async ({ authenticatedPage: page }) => {
    await page.getByTestId('song-101').getByTestId('artwork-play-btn').click();

    const player = page.getByTestId('audio-player');
    await expect(player).toBeVisible();
    await expect(player.getByText('Starlight')).toBeVisible();
  });

  test('play button is visible in audio player', async ({ authenticatedPage: page }) => {
    await page.getByTestId('song-101').getByTestId('artwork-play-btn').click();
    await expect(page.getByTestId('play-btn')).toBeVisible();
  });

  test('next and previous buttons are visible', async ({ authenticatedPage: page }) => {
    await page.getByTestId('song-101').getByTestId('artwork-play-btn').click();
    await expect(page.getByTestId('next-btn')).toBeVisible();
    await expect(page.getByTestId('prev-btn')).toBeVisible();
  });

  test('clicking next changes to next track', async ({ authenticatedPage: page }) => {
    await page.getByTestId('song-101').getByTestId('artwork-play-btn').click();
    await expect(page.getByTestId('audio-player').getByText('Starlight')).toBeVisible();

    await page.getByTestId('next-btn').click();
    await expect(page.getByTestId('audio-player').getByText('Uprising')).toBeVisible();
  });
});
