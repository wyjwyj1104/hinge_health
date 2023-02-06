## Title

Hinge Health Interview Solution

- https://github.com/Hinge-Health-Recruiting/interviews-services_wyjwyj1104

## Prerequisite

- [NodeJs 12](https://nodejs.org/en/) It is recommended to use a version manager such as [NVM](https://github.com/nvm-sh/nvm) to install NodeJS.

## Setup and running the app

```
$ npm install
$ npm start
```

## Test

### Postman test

- **Run Server:**

```
$ npm start
```

- **Basic Auth:** Username: "admin", Password: "qwe123"
- **Create Animal Data (1):** POST http://localhost:3001/api/tree
- **Get Tree Data (2):** GET http://localhost:3001/api/tree

## Fundamentals

The code is divided into different modules which consist of 3 layers: Controller, Business Service, and Data Model.

- **Controllers:** are responsible for handling incoming request and returning response to the client.
- **Services:** are responsible for handling the actual business logic.
- **Models:** are the representations of the business model.

### Dev purpose

```
$ lsof -i tcp:3001
$ kill -9 PID
```

### Dev purpose

```.todo
- [x] Project setup.
- [x] Task 1 - Endpoint to insert animal node to tree.
- [x] Taks 2 - Endpoint to get nested animal data in the tree.
- [x] Taks 3 - Data Schema.
- [X] Task 3-1 - Test with MongoDB through mongoose
- [x] Taks 4 - Database.md file
- [] Mock test using sinon and supertest.
```
