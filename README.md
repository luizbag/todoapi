# To-Do List Service - Phase 1: Architecture

This document outlines the architecture for a RESTful to-do list service.

**1. Project Overview**

- **Goal:** Develop a simple to-do list service with CRUD operations.
- **Technologies:**
  - **Node.js with Express.js:** For building the RESTful API.
  - **TypeScript:** For type safety and improved code maintainability.
  - **SQLite:** As the in-memory database for rapid development.
  - **Prisma:** As the Object-Relational Mapper (ORM) for interacting with the database.
  - **InversifyJS:** For dependency injection.

**2. Project Structure**

```
todo-list-service/
├── src/
│   ├── controllers/
│   │   └── TodoController.ts
│   ├── prisma/
│   │   └── migrations/
│   │   └── schema.prisma
│   ├── services/
│   │   └── TodoService.ts
│   ├── config/
│   │   └── inversify.config.ts
|   |   └── server.config.ts
|   |   └── logger.config.ts
│   └── main.ts
├── tests/
│   └── TodoController.spec.ts
│   └── TodoService.spec.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

**3. Service Architecture**

- **Controllers:** Handle incoming requests, validate data, and delegate to services.
- **Services:** Encapsulate business logic for interacting with the database via Prisma.
- **Utils:** Contains helper functions, such as error handling.
- **Prisma:** Handles database interactions, migrations, and data seeding.
- **InversifyJS:** Used for dependency injection to improve code organization and testability.
  - **`config/inversify.config.ts`:** Registers services and controllers in the Inversify container.

**4. REST Endpoints**

- **`/todos`:**
  - **GET:** Retrieve a list of all to-do items.
  - **POST:** Create a new to-do item.
- **`/todos/:id`:**
  - **GET:** Retrieve a specific to-do item by ID.
  - **PUT:** Update an existing to-do item.
  - **DELETE:** Delete a to-do item.

**5. Database**

- **SQLite:** Used for its simplicity and ease of use for development.
- **Prisma:** Provides an abstraction layer for interacting with the SQLite database.
- **Schema:** Defined in `prisma/schema.prisma`, describing the `Todo` model with fields for `id`, `description`, `createdAt`, and `dueDate`.

**Note:**

- This is a high-level overview of the architecture.
- Specific implementation details will be further elaborated in the code and comments.
