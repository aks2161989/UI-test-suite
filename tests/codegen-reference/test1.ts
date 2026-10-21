import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Web Application Main web' }).click();
  await page.getByText('Web ApplicationMain web application developmentLogout').click();
  await page.getByText('To Do (2)Implement user').click();
  await page.getByText('Implement user authenticationAdd login and signup functionalityFeatureHigh').click();
  await page.getByRole('heading', { name: 'Implement user authentication' }).click();
  await page.getByText('Feature').first().click();
  await page.getByText('High Priority').first().click();
});