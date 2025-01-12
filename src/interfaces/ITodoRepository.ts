import { TodoItemDto } from "./TodoItemDto";

export interface ITodoRepository {
  getAllTodos(): Promise<TodoItemDto[]>;
  getTodoById(id: number): Promise<TodoItemDto | null>;
  createTodo(todo: TodoItemDto): Promise<TodoItemDto>;
  updateTodo(
    id: number,
    todo: Partial<TodoItemDto>
  ): Promise<TodoItemDto | null>;
  deleteTodo(id: number): Promise<void>;
}
