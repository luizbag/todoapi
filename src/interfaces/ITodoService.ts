import { TodoItemDto } from "./TodoItemDto";

export interface ITodoService {
  createTodoItem(item: TodoItemDto): Promise<TodoItemDto | null>;
  getTodoItemById(id: number): Promise<TodoItemDto | null>;
  getAllTodoItems(): Promise<TodoItemDto[]>;
  updateTodoItem(id: number, item: TodoItemDto): Promise<TodoItemDto | null>;
  deleteTodoItem(id: number): Promise<void>;
}
