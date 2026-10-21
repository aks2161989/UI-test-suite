import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://create-asana-like-pr-39y5.bolt.host/');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Web Application Main web' }).click();
  await page.getByRole('banner').getByRole('heading', { name: 'Web Application' }).click();
  await page.getByText('To Do (2)Implement user').click();
  await page.getByText('Fix navigation bugMenu does').click();
  await page.getByRole('heading', { name: 'Fix navigation bug' }).click();
  await page.getByText('Bug', { exact: true }).click();
});