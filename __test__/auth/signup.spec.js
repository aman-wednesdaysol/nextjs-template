import { test, expect } from '@playwright/test';
import { TEST_USER } from '../mocks/data';
import { mockSignupSuccess, mockSignupFailure, mockLibrary, mockSearchSongs } from '../mocks/handlers';

test.describe('Signup Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('renders signup form fields', async ({ page }) => {
    await expect(page.getByTestId('signup-name')).toBeVisible();
    await expect(page.getByTestId('signup-email')).toBeVisible();
    await expect(page.getByTestId('signup-password')).toBeVisible();
    await expect(page.getByTestId('signup-submit')).toBeVisible();
  });

  test('successful signup redirects to home', async ({ page }) => {
    await mockSignupSuccess(page);
    await mockLibrary(page);
    await mockSearchSongs(page, []);

    await page.getByTestId('signup-name').fill(TEST_USER.name);
    await page.getByTestId('signup-email').fill(TEST_USER.email);
    await page.getByTestId('signup-password').fill(TEST_USER.password);
    await page.getByTestId('signup-submit').click();

    await page.waitForURL('**/');
  });

  test('failed signup shows error message', async ({ page }) => {
    await mockSignupFailure(page);

    await page.getByTestId('signup-name').fill(TEST_USER.name);
    await page.getByTestId('signup-email').fill(TEST_USER.email);
    await page.getByTestId('signup-password').fill(TEST_USER.password);
    await page.getByTestId('signup-submit').click();

    await expect(page.getByTestId('signup-error')).toBeVisible();
  });

  test('navigates to login page', async ({ page }) => {
    await page.getByText('Sign in').click();
    await expect(page).toHaveURL(/\/login/);
  });
});
