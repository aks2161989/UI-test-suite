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
  await page.getByText('Done (1)App icon designCreate').click();
  await page.getByRole('heading', { name: 'Done (1)' }).click();
  await page.getByText('App icon designCreate app').click();
  await page.getByRole('heading', { name: 'App icon design' }).click();
  await page.getByText('Design', { exact: true }).click();
});