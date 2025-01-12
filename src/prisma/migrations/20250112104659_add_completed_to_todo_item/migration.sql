/*
  Warnings:

  - Added the required column `completed` to the `TodoItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "createdOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATETIME,
    "completed" BOOLEAN NOT NULL
);
INSERT INTO "new_TodoItem" ("createdOn", "description", "dueDate", "id") SELECT "createdOn", "description", "dueDate", "id" FROM "TodoItem";
DROP TABLE "TodoItem";
ALTER TABLE "new_TodoItem" RENAME TO "TodoItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
