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
The project is organized into several key directories and files to maintain a clean and modular structure:

- **`src/`**: Contains the main source code for the application.

  - **`controllers/`**: Houses the controller files that handle HTTP requests and responses.
    - **`todo.controller.ts`**: Manages CRUD operations for to-do items.
  - **`interfaces/`**: Houses the interfaces for the application.
  - **`prisma/`**: Contains Prisma-related files.
    - **`migrations/`**: Stores database migration files.
    - **`schema.prisma`**: Defines the database schema.
  - **`services/`**: Contains service files that encapsulate business logic.
    - **`todo.service.ts`**: Implements the logic for managing to-do items.
  - **`repositories/`**: Contains repository files that encapsulate database logic.
    - **`todo.repository.ts`**: Implements the logic for managing to-do items data.
  - **`config/`**: Holds configuration files for various aspects of the application.
    - **`inversify.config.ts`**: Configures dependency injection.
    - **`server.config.ts`**: Configures server settings.
    - **`logger.config.ts`**: Configures logging.
  - **`main.ts`**: The entry point of the application.

- **`tests/`**: Contains test files to ensure the application works as expected.

  - **`todo.controller.test.ts`**: Tests for the `TodoController`.

- **`package.json`**: Lists dependencies and scripts for the project.
- **`tsconfig.json`**: Configures TypeScript settings.
- **`.gitignore`**: Specifies files and directories to be ignored by Git.

This structure helps in maintaining a clear separation of concerns, making the codebase easier to manage and scale.

**3. Service Architecture**

- **Controllers:** Handle incoming requests, validate data, and delegate to services.
- **Services:** Encapsulate business logic for interacting with the database via Prisma.
- **Utils:** Contains helper functions, such as error handling.
- **Prisma:** Handles database interactions, migrations, and data seeding.
- **InversifyJS:** Used for dependency injection to improve code organization and testability.

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
