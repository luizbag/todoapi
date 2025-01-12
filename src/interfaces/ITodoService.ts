import { TodoItemDto } from "./TodoItemDto";

export interface ITodoService {
  createTodoItem(item: TodoItemDto): Promise<TodoItemDto>;
  getTodoItemById(id: number): Promise<TodoItemDto>;
  getAllTodoItems(): Promise<TodoItemDto[]>;
  updateTodoItem(id: number, item: TodoItemDto): Promise<TodoItemDto>;
  deleteTodoItem(id: number): Promise<void>;
}
