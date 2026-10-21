import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://create-asana-like-pr-39y5.bolt.host/');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Mobile Application Native' }).click();
  await page.getByRole('banner').getByRole('heading', { name: 'Mobile Application' }).click();
  await page.getByText('In Progress (1)Offline').click();
  await page.getByRole('heading', { name: 'Offline mode' }).click();
  await page.getByText('Feature').nth(1).click();
  await page.getByText('High Priority').click();
});