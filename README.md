# Playwright Data-Driven UI Test Suite

Automated UI test suite built with Playwright and TypeScript for the **Loop Technical Evaluation**.

The test suite validates task cards, column positioning, and tags across projects on the Asana-like demo web application (`https://create-asana-like-pr-39y5.bolt.host/`).

---

## Architecture & Design

- **Data-Driven Testing**: Test scenarios are structured in [`data/testCases.json`](data/testCases.json). Each JSON object dynamically generates an independent Playwright test from a shared implementation, so adding new test cases requires only new data without duplicating automation code.
- **Page Object Model (POM)**:
  - [`LoginPage`](pages/LoginPage.ts): Manages authentication interactions and verifies landing state using web-first assertions.
  - [`BoardPage`](pages/BoardPage.ts): Handles sidebar project navigation, column discovery, and scoped card/tag validations.
- **Scoped Locator Strategy**: Locators and assertions are scoped hierarchically (`Column -> Task Card -> Tags`) to ensure tags and cards are validated strictly within their intended column context rather than globally on the page.
- **Cross-Browser Coverage**: Configured and verified across Chromium, Firefox, and WebKit.
- **CI/CD Integration**: Includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) to run the test suite on pushes and pull requests.

---

## Project Structure

```
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI workflow
├── data/
│   ├── authData.json              # Credentials for test runner
│   └── testCases.json             # Data-driven JSON scenarios for TC1-TC6
├── pages/
│   ├── BoardPage.ts               # POM for board interactions & assertions
│   └── LoginPage.ts               # POM for login & authentication
├── tests/
│   └── board-data-driven.spec.ts  # Main data-driven test suite
├── types/
│   └── index.ts                   # TypeScript interfaces for test data & auth
├── playwright.config.ts           # Playwright runner configuration
├── package.json                   # Dependencies & npm run scripts
└── README.md                      # Project documentation 
```

---

## Test Scenarios Covered

| Test Case | Project | Task Title | Column | Expected Tags |
| :--- | :--- | :--- | :--- | :--- |
| **TC 1** | Web Application | Implement user authentication | To Do | `Feature`, `High Priority` |
| **TC 2** | Web Application | Fix navigation bug | To Do | `Bug` |
| **TC 3** | Web Application | Design system updates | In Progress | `Design` |
| **TC 4** | Mobile Application | Push notification system | To Do | `Feature` |
| **TC 5** | Mobile Application | Offline mode | In Progress | `Feature`, `High Priority` |
| **TC 6** | Mobile Application | App icon design | Done | `Design` |

---

## Getting Started

### Prerequisites

- Node.js v24 LTS 
- npm

### Installation

1. Clone repository:
   ```bash
   git clone <your-repo-url>
   cd UI-test-suite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browser binaries:
   ```bash
   npx playwright install --with-deps
   ```

---

## Running the Tests

- **Run all tests across all browsers (Chromium, Firefox, WebKit)**:
  ```bash
  npm test
  ```

- **Run only Chromium**:
  ```bash
  npm run test:chromium
  ```

- **Run tests in headed mode (visible browser window)**:
  ```bash
  npm run test:headed
  ```

- **Open the HTML Test Report**:
  ```bash
  npm run test:report
  ```

---

## Locator Strategy Explanation

During initial exploration, Playwright Codegen produced selectors with brittle patterns such as:
- Coupling to mutable badge counts (e.g. `'To Do (2)'`)
- Using global positional indexers like `.first()` and `.nth(1)` across the whole page
- Missing DOM hierarchy verification

### Solution: Scoped DOM Queries
1. **Column**:
   ```typescript
   const column = page.locator('main').getByRole('heading', {
     level: 2,
     name: new RegExp(`^${columnName}\\b`, 'i'),
   }).locator('..');
   ```
2. **Card (Scoped to Column)**:
   ```typescript
   const card = column.getByRole('heading', {
     level: 3,
     name: taskTitle,
     exact: true,
   }).locator('..');
   ```
3. **Tags (Scoped to Card)**:
   ```typescript
   const tag = card.getByText(tagName, { exact: true });
   ```

This approach ensures that:
- Adding, removing, or reordering task cards does not affect the selectors as long as the semantic heading structure remains consistent.
- Verifying a tag strictly asserts it belongs to that specific task card inside that specific column.
