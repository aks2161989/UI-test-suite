import { Page, Locator, expect } from '@playwright/test';

export class BoardPage {
  readonly page: Page;
  readonly navSidebar: Locator;
  readonly mainContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navSidebar = page.locator('nav');
    this.mainContent = page.locator('main');
  }

  /**
   * Navigates to a specific project by clicking its button in the sidebar navigation.
   * Verifies that the project header updates accordingly.
   */
  async navigateToProject(projectName: string) {
    const projectButton = this.navSidebar.getByRole('button', {
      name: new RegExp(`^${projectName}\\b`, 'i'),
    });
    await expect(projectButton).toBeVisible();
    await projectButton.click();

    // Verify header updates to the selected project
    const projectHeader = this.page
      .getByRole('banner')
      .getByRole('heading', { level: 1, name: projectName, exact: true });
    await expect(projectHeader).toBeVisible();
  }

  /**
   * Locates a column container by its heading name (e.g. "To Do", "In Progress", "Done").
   * Ignores dynamic count badges such as "(2)" or "(1)".
   */
  getColumn(columnName: string): Locator {
    const columnHeading = this.mainContent.getByRole('heading', {
      level: 2,
      name: new RegExp(`^${columnName}\\b`, 'i'),
    });
    return columnHeading.locator('..');
  }

  /**
   * Locates a card container inside a specific column by its task title heading.
   */
  getCardInColumn(columnName: string, taskTitle: string): Locator {
    const column = this.getColumn(columnName);
    const cardTitle = column.getByRole('heading', {
      level: 3,
      name: taskTitle,
      exact: true,
    });
    return cardTitle.locator('..');
  }

  /**
   * Verifies that a task card is visible within the specified column.
   */
  async verifyCardInColumn(columnName: string, taskTitle: string) {
    const column = this.getColumn(columnName);
    await expect(
      column,
      `Expected column "${columnName}" to be visible`
    ).toBeVisible();

    const card = this.getCardInColumn(columnName, taskTitle);
    await expect(
      card,
      `Expected task "${taskTitle}" to be visible inside column "${columnName}"`
    ).toBeVisible();
  }

  /**
   * Verifies that the task card in the specified column contains all expected tags.
   */
  async verifyCardTags(columnName: string, taskTitle: string, expectedTags: string[]) {
    const card = this.getCardInColumn(columnName, taskTitle);
    await expect(card).toBeVisible();

    for (const tag of expectedTags) {
      const tagBadge = card.getByText(tag, { exact: true });
      await expect(
        tagBadge,
        `Expected tag "${tag}" to be visible on card "${taskTitle}" in column "${columnName}"`
      ).toBeVisible();
    }
  }
}
