# 🚀 ParaBank Cypress Test Suite

This repository contains automated end-to-end tests for the ParaBank application using [Cypress](https://www.cypress.io/)

## 📜 Table of Contents



- [💾 Installation](#installation)
- [🧪 Running Tests](#running-tests)
- [✅ Test Cases](#test-cases)
  - [🏠 Home Page Functionalities](#home-page-functionalities)
  - [📝 User Registration](#user-registration)
  - [🔑 User Login](#user-login)
  - [🏦 Account Services](#account-services)
  - [🔒 Security Tests](#security-tests)
  - [🛡 CAPTCHA Validation](#captcha-validation)

## 💾 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/MantvydasIvaskevicius/parabank-cypress-tests.git
   ```
2. Navigate to the project folder:
   ```sh
   cd parabank-cypress-tests
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## 🧪 Running Tests

To run the Cypress tests, use the following command:

- Run tests in headless mode:
  ```sh
  npx cypress run
  ```
- Run tests in interactive mode:
  ```sh
  npx cypress open
  ```

## ✅ Test Cases

### 🏠 Home Page Functionalities

- ✅ Verify homepage loads successfully.
- 🔄 Clicking the logo redirects to the homepage.
- 📌 Check if navigation menus contain the expected number of elements.
- 🏷 Validate that various sections display correct options.

### 📝 User Registration

- 📩 Verify registration page displays the "Signing up is easy!" message.
- 🆕 Register a new user with valid details.
- ⚠️ Check for errors when required fields are missing or incorrect.
- 🏗 Test edge cases like long usernames and passwords.

### 🔑 User Login

- 🔓 Successfully log in with correct credentials.
- ❌ Validate error messages for incorrect login attempts.
- 🔄 Verify login and logout functionalities.

### 🏦 Account Services

- 💵 Perform bill payments.
- 🏧 Open new checking and savings accounts.
- 🔁 Transfer money between accounts.
- ✏️ Update user profile details.
- 💳 Request a loan.
- 📝 Submit customer service forms.
- 🔍 Recover login information.

### 🔒 Security Tests

- 🛠 Check password complexity requirements.
- 🚫 Prevent SQL injection in username and password fields.
- ⚠️ Ensure error messages appear for incorrect inputs.

### 🛡 CAPTCHA Validation


- 🔍 Verify CAPTCHA appears after multiple failed login attempts.
- 🚫 Ensure automated logins are blocked if CAPTCHA is present.
