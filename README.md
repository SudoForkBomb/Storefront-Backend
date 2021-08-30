# Storefront Backend Project

Udacity Project #2: Build a Storefront Backend

## Getting Started

This repo contains a basic Node and Express app based around a storefront backend. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Setup

Below are the required steps to get the project up an running.

### ENV File

The project uses dotenv to set environment variables. The following will need to be created within your .env file:

- POSTGRES_HOST
- POSTGRES_DB
- POSTGRES_TEST_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- NODE_ENV
- BCRYPT_PASSWORD
- SALT_ROUNDS
- TOKEN_SECRET

### Docker

The database can be created and run using the command 'docker compose up -d', within the project directory, to create a new Postgres database using the docker-compose.yml.\
If you have issues with the database generating properly, make sure your .env file is properly filled in.

### yarn install

Installs required dependencies.

## Scripts

In the project directory, you can run:

### yarn start

Runs the app using nodemon in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
The page will reload if you make edits.\

### yarn test

**BEFORE RUNNING, MUST CHANGE NODE_ENV TO 'test' IN .env FILE.**
Uses Jasmine to run unit tests.

### yarn build

Builds the app for production to the `dist` folder.\

### yarn watch

Runs the watcher library and starts the application.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\

## Technologies

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## API Endpoints and Database Schema

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend.
