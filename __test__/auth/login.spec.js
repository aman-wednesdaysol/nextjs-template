import { test, expect } from '@playwright/test';
import { TEST_USER } from '../mocks/data';
import { mockLoginSuccess, mockLoginFailure, mockLibrary, mockSearchSongs } from '../mocks/handlers';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('renders login form fields', async ({ page }) => {
    await expect(page.getByTestId('login-email')).toBeVisible();
    await expect(page.getByTestId('login-password')).toBeVisible();
    await expect(page.getByTestId('login-submit')).toBeVisible();
  });

  test('successful login redirects to home', async ({ page }) => {
    await mockLoginSuccess(page);
    await mockLibrary(page);
    await mockSearchSongs(page, []);

    await page.getByTestId('login-email').fill(TEST_USER.email);
    await page.getByTestId('login-password').fill(TEST_USER.password);
    await page.getByTestId('login-submit').click();

    await page.waitForURL('**/');
  });

  test('failed login shows error message', async ({ page }) => {
    await mockLoginFailure(page);

    await page.getByTestId('login-email').fill(TEST_USER.email);
    await page.getByTestId('login-password').fill('wrong');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('login-error')).toBeVisible();
  });

  test('navigates to signup page', async ({ page }) => {
    await page.getByText('Create one').click();
    await expect(page).toHaveURL(/\/signup/);
  });
});
