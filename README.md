## Lendsqr Backend Test

### Introduction

This is a simple backend test for Lendsqr.
It is a simple API that allows users to carry out basic wallet transactions.

### Instruction

Given a requirement to build a system where
∙ A user can create an account
∙ A user can fund their account
∙ A user can transfer funds to another user’s account ∙ A user can withdraw funds from their account.

## Getting Started

### Prerequisites

The tools listed below are needed to run this application to run effectively:

- Node (LTS Version)
- Npm v8.3.1 or above

You can check the Node.js and npm versions by running the following commands.

### Check node.js version

`node -v`

### Check npm version

`npm -v`

## Installation

- Install project dependencies by running `yarn add`.

- Run the migrations to create database tables by running `yarn knex:migrate`

- Access endpoints on your set port or `127.0.0.1:3002`

| Method | Description   | Endpoints               | Role |
| :----- | :------------ | :---------------------- | :--- |
| POST   | Signup user   | /api/v1/auth/signup     | \-   |
| POST   | Login user    | /api/v1/auth/login      | \-   |
| GET    | User profile  | /api/v1/auth/me         | \*   |
| POST   | Deposit Fund  | /api/v1/wallet/deposit  | \*   |
| POST   | Transfer Fund | /api/v1/wallet/transfer | \*   |
| POST   | Withdraw Fund | /api/v1/wallet/withdraw | \*   |

## Postman documentation

https://documenter.getpostman.com/view/12204297/VUjSGj2o
