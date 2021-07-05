- [Requiremenets](#requirements)
- [Developer Setup](#developer-setup)
- [Dev Tools](#dev-tools)
- [Global Scripts](#global-scripts)

---

## Requirements

- Node 14.x+ (or nvm)
- Yarn
- PostgreSQL (or docker)

## Developer Setup

- From root project directory, install dependencies:

  ```shell
  yarn
  ```

- Copy `testrunner/example.env` to `testrunner/.env` and update according to your local configuration.

- Run a local instance of the test runner:

  ```shell
  yarn testrunner dev
  ```

- Copy `server/example.env` to `server/.env` and update according to your local configuration.

- Initialize the database:

  ```shell
  yarn server prisma db push
  ```

- Run a local instance of the backend:

  ```shell
  yarn server dev
  ```

- Copy `client/example.env` to `client/.env` and update according to your local configuration.

- Launch snowpack dev server:

  ```shell
  yarn client dev
  ```

## Dev Tools

### Altair GraphQL playground

GraphQL client IDE

- While client + backend dev servers are running, visit: `http://localhost:3000/altair`

### Prisma Studio

ORM Database Admininistration

- Run:

  ```shell
  yarn server prisma studio
  ```

- Then visit `http://localhost:5555`

### React Cosmos

Develop UI components in isolation

- While the client dev server is running:

  ```shell
  yarn client cosmos
  ```

- Then visit `http://localhost:5000`

## Global Scripts

- Run eslint/prettier across all workspaces:

  ```shell
  yarn lint
  # or
  yarn lint:fix
  ```

- Build all workspaces:

  ```shell
  yarn build
  ```

- Use `yarn (testrunner|server|client) [command]` to execute yarn commands in a workspace:

  ```shell
  yarn testrunner
  yarn server
  yarn client
  ```
