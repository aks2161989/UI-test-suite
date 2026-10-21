# Playwright Data-Driven UI Test Suite

Automated UI test suite built with [Playwright](https://playwright.dev/) and TypeScript for the **Loop Technical Evaluation - 2025**.

The test suite validates task cards, column positioning, and tags across projects on the Asana-like demo web application (`https://create-asana-like-pr-39y5.bolt.host/`).

---

## Key Features & Architecture

- **Data-Driven Architecture**: Adheres strictly to the evaluation requirement. All 6 test scenarios are defined as structured data in [`data/testCases.json`](data/testCases.json). Scenarios dynamically drive tests without code duplication.
- **Page Object Model (POM)**:
  - [`LoginPage`](pages/LoginPage.ts): Encapsulates authentication interactions and verification.
  - [`BoardPage`](pages/BoardPage.ts): Encapsulates navigation between projects, column discovery, and scoped card & tag validations.
- **Resilient Hierarchical Locators**:
  - Replaces brittle codegen selectors (such as `.first()`, `.nth()`, and text-concatenated counts like `'To Do (2)'`).
  - Scopes assertions hierarchically: `Column (by heading) -> Task Card (by title) -> Tag Badges (by text)`.
- **Cross-Browser Verification**: Fully verified across **Chromium**, **Firefox**, and **WebKit** (Safari).
- **CI/CD Integration**: Pre-configured GitHub Actions workflow (`.github/workflows/playwright.yml`).

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
└── README.md                      # Project documentation & walkthrough guide
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

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (v9 or higher)

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

Initial codegen recordings contained brittle patterns:
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

This guarantees that:
- Adding, removing, or reordering task cards does not affect the selectors as long as the semantic heading structure remains consistent.
- Verifying a tag strictly asserts it belongs to that specific task card inside that specific column.

---

## 2-3 Minute Video Walkthrough Outline

For the submission requirement, here is a suggested walkthrough structure:

1. **Introduction (0:00 - 0:30)**:
   - State your name and project goal: completing the Loop technical evaluation for the Asana-like board.
   - Mention the core requirement: 100% data-driven test suite written in Playwright & TypeScript.
2. **Architecture & Locator Strategy (0:30 - 1:30)**:
   - Explain why raw codegen locators fail in real-world QA (brittle strings, `.first()`, lack of column scoping).
   - Show `BoardPage.ts` and `LoginPage.ts` implementing the Page Object Model.
   - Highlight the hierarchical scoping: Column $\rightarrow$ Card $\rightarrow$ Tags.
3. **Data-Driven Implementation (1:30 - 2:00)**:
   - Open `data/testCases.json` showing the 6 test scenarios cleanly modeled as JSON.
   - Show `board-data-driven.spec.ts` dynamically executing each scenario using `for (const scenario of testCases)` and `test.step()`.
4. **Execution & Wrap-up (2:00 - 2:45)**:
   - Run `npm test` in the terminal and show all 18 tests passing across Chromium, Firefox, and WebKit.
   - Briefly show the generated Playwright HTML report.
