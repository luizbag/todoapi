export type TodoItemDto = {
  id: number | null;
  description: string;
  createdOn?: Date;
  dueDate: Date | null;
  completed?: boolean;
};
