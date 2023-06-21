# Shopping Store Playwright Test

This repository contains a comprehensive test suite built using JavaScript and Node.js for testing the functionality of the Shopping Store application using Playwright. The tests cover various scenarios and user interactions to ensure the reliability and accuracy of the application.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Shopping Store Playwright Test repository is created to automate the testing process of the Shopping Store application. It utilizes Playwright, a powerful Node.js library for automating browser actions, to simulate user interactions and verify the correctness of the application's features.

## Prerequisites

Before running the tests, make sure you have the following software installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org)
- Git: [Download and Install Git](https://git-scm.com)

## Installation

1. Clone this repository to your local machine using the following command:
   ```bash
   git clone https://github.com/your-username/shopping-store-playwright-test.git
   ```

2. Navigate to the cloned directory:
   ```bash
   cd shopping-store-playwright-test
   ```

3. Install the required dependencies by running:
   ```bash
   npm install
   ```

## Usage

To run the tests, you can use the following commands:

- Firstly run 'shopping-store-mac-arm64' or 'shopping-store-linux-amd64' files according to your operating system.


- To run the tests in a headed mode (browser window visible), use the following command:
  ```bash
  npm test
  ```

- To run the tests in a headless mode (browser window not visible), use the following command:
  ```bash
  npm run test:ci
  ```

## Writing Tests

The test suite is organized using the folder structure under the `tests` directory. Each test file represents a specific feature or functionality of the Shopping Store application. You can create new test files or modify existing ones based on your requirements.

To create a new test file, follow these steps:

1. Navigate to the `tests` directory.
2. Create a new JavaScript file with a descriptive name that reflects the feature you want to test (e.g., `checkout.spec.js`).
3. Write your test cases using the Playwright. Refer to the [Playwright documentation](https://playwright.dev/docs/intro) for detailed information on how to write tests.

## Running Tests

When running the tests, Playwright will launch a browser instance and execute the test cases sequentially. The test results will be displayed in the console.

The tests are designed to be independent and isolated, ensuring that they can be executed individually or as a group without dependencies on previous test runs. This enables you to run specific tests or focus on specific areas of the application during development and debugging.

## Contributing

Contributions to this repository are welcome. If you find any issues or would like to add new features, please follow these steps:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more details.

