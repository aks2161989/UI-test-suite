import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BoardPage } from '../pages/BoardPage';
import testCasesData from '../data/testCases.json';
import authData from '../data/authData.json';
import { TestCaseData, AuthData } from '../types';

const testCases: TestCaseData[] = testCasesData;
const auth: AuthData = authData;

test.describe('Asana-like Project Board - Data-Driven Test Suite', () => {
  let loginPage: LoginPage;
  let boardPage: BoardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    boardPage = new BoardPage(page);

    await test.step('Navigate to login page and authenticate', async () => {
      await loginPage.goto('/');
      await loginPage.login(auth.username, auth.password);
    });
  });

  // Dynamically iterate over each scenario driven by the JSON data file
  for (const scenario of testCases) {
    test(`[${scenario.name}] ${scenario.description}`, async () => {
      await test.step(`Navigate to "${scenario.project}"`, async () => {
        await boardPage.navigateToProject(scenario.project);
      });

      await test.step(`Verify "${scenario.taskTitle}" is in the "${scenario.column}" column`, async () => {
        await boardPage.verifyCardInColumn(scenario.column, scenario.taskTitle);
      });

      await test.step(`Confirm tags: [${scenario.tags.join(', ')}]`, async () => {
        await boardPage.verifyCardTags(scenario.column, scenario.taskTitle, scenario.tags);
      });
    });
  }
});
