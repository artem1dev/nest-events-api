# Event Manager

This project is an event manager built using `NestJs`. It was created to enhance my understanding of `NestJs` while tackling a challenging and complex task. The backend for events in this application follows a simple yet effective concept.

## Technologies Used

- **Nest.js**: A progressive Node.js framework for building efficient, scalable, and maintainable server-side applications.

- **TypeORM**: An Object-Relational Mapping (ORM) that simplifies database interactions with strong TypeScript support.

- **MySQL**: A powerful relational database system known for its performance and reliability.

- **Jest**: A widely-used testing framework for JavaScript and TypeScript applications, ensuring code reliability through unit and integration tests.

- **Docker**: A containerization platform that allows for easy deployment and scaling of applications.

# Installation

## Prerequisites

Before you begin, ensure you have Node.js version 18.16.0 or later installed on your machine.

## Getting Started

Project is using `pnpm` as package manager, but you can use `npm` or `yarn` as well.
```bash
$ npm install
```

## Running with Docker (Optional)

If you prefer to use Docker, the repository contains a `docker-compose.yml` file. It includes configurations for the database and Adminer.

```bash
docker-compose up
```

If you choose to host the database locally, it's up to you. This app utilizes MySQL.

## Environment Configuration

The repository includes an `Example.env` file. You should create the following environment files:

- `.env`: Default environment for new scripts
- `dev.env`: Used during development (`npm run start:dev`)
- `prod.env`: Used during production (`npm run start:prod`)
- `e2e.env`: Used during end-to-end testing (`npm run test:e2e`)

You can use the `Example.env` file as a template.

## Running the Application

To run the application, use the following commands:

- **Development**:

  ```bash
  npm run start:dev
  ```

- **Production**:

  ```bash
  npm run build
  npm run start:prod
  ```

Once the application is running, you can access it via `http://localhost:3000/`.

## Test

- **Unit tests**:
```bash
npm run test
```
- **e2e tests**:
```bash
npm run test:e2e
```
