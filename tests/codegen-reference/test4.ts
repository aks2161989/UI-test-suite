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
  await page.getByText('To Do (1)Push notification').click();
  await page.getByRole('heading', { name: 'To Do (1)' }).click();
  await page.getByText('Push notification systemImplement push notifications for iOS and').click();
  await page.getByRole('heading', { name: 'Push notification system' }).click();
  await page.getByText('Feature').first().click();
});