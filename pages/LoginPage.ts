import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
  }

  /**
   * Navigates to the login page (uses baseURL if configured).
   */
  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  /**
   * Fills in login credentials, submits the form, and verifies successful navigation.
   */
  async login(username: string, password: string) {
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(username);
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
    await expect(this.signInButton).toBeVisible();
    await this.signInButton.click();

    // Verify post-login landing state by asserting the "Projects" heading is visible
    await expect(
      this.page.getByRole('heading', { name: 'Projects', exact: true }),
      'Expected "Projects" header to be visible upon successful login'
    ).toBeVisible();
  }
}
