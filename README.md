# Product Catalog RESTful API with TDD and BDD

[![Node.js CI](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository contains the final project implementation for the **IBM: Introduction to Test-Driven Development (TDD) and Behavior-Driven Development (BDD)** course on Coursera.

It implements a microservice-based product catalog RESTful API using **Node.js, Express, Sequelize, and Faker.js**, with automated testing written in **Jest/Supertest (TDD)** and **Cucumber/Selenium (BDD)**.

---

## Project Overview

The service provides complete CRUD and query capabilities for managing products:
- **Create**: Add new products to the catalog.
- **Read**: Fetch a product by its unique ID.
- **Update**: Modify attributes (name, description, price, availability, category).
- **Delete**: Remove a product from the database.
- **List / Filter**: Retrieve all products, or filter by:
  - Substring name search
  - Category
  - Availability status

---

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database / ORM:** SQLite / PostgreSQL with Sequelize
- **TDD / Unit Testing:** Jest, Supertest
- **Mock Data Generation:** @faker-js/faker
- **BDD Testing:** Cucumber.js, Gherkin syntax, Selenium WebDriver

---

## Repository Structure

- `features/products.feature` — BDD Scenarios (CRUD and Search workflows)
- `features/step_definitions/load_steps.js` — Cucumber background data loader via REST API
- `features/step_definitions/web_steps.js` — Selenium automation steps (button clicks, assertions)
- `src/routes/products.js` — RESTful API endpoint handlers
- `tests/factories.js` — Factory definition with build/create/buildList/createList
- `tests/models/product.test.js` — Unit tests for Sequelize model methods
- `tests/routes/products.test.js` — Integration tests for REST endpoints
- `README.md` — Project documentation

---

## Testing

### Running TDD Unit / Integration Tests
npm test

### Running BDD Feature Tests
npm run bdd

---

## Peer Review Checklist Mapping

| Task | Component | File Path |
| --- | --- | --- |
| Task 1 | Factory Data Generator | tests/factories.js |
| Task 2 | Model Unit Tests | tests/models/product.test.js |
| Task 3 | REST API Route Tests | tests/routes/products.test.js |
| Task 4 | Express Routes Implementation | src/routes/products.js |
| Task 5 | BDD Background Data Loader | features/step_definitions/load_steps.js |
| Task 6 | Gherkin Feature Scenarios | features/products.feature |
| Task 7 | Step Definitions (Selenium) | features/step_definitions/web_steps.js |

---

## License
This project is licensed under the MIT License.
