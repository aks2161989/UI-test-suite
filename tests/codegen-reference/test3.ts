import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://create-asana-like-pr-39y5.bolt.host/');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Web Application Main web' }).click();
  await page.getByRole('banner').getByRole('heading', { name: 'Web Application' }).click();
  await page.getByText('In Progress (1)Design system').click();
  await page.getByText('Design system updatesUpdate').click();
  await page.getByRole('heading', { name: 'Design system updates' }).click();
  await page.getByText('Design', { exact: true }).click();
});