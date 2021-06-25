# 🏌️‍♀️ JS Golf 🏌️‍♂️

Source code for js.golf, a Javascript code golf competition website.

## Requirements

* Node 14.x+ (or nvm)
* Yarn
* PostgreSQL (or docker)

## Developer Setup

* From root project directory, install dependencies:

  ```shell
  yarn
  ```

* Copy `testrunner/example.env` to `testrunner/.env` and update according to your local configuration.

* Run a local instance of the test runner:

  ```shell
  yarn testrunner dev
  ```

* Copy `server/example.env` to `server/.env` and update according to your local configuration.

* Initialize the database:

  ```shell
  yarn server prisma db push
  ```

* Run a local instance of the backend:

  ```shell
  yarn server dev
  ```

* Copy `client/example.env` to `client/.env` and update according to your local configuration.

* Launch snowpack dev server:

  ```shell
  yarn client dev
  ```

## Dev Tools

* Altair GraphQL playground: `http://localhost:3000/altair`

* Prisma Studio (ORM / Database Admin)

  ```shell
  yarn server prisma studio
  ```
