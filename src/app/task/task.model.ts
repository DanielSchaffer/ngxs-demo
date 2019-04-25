export interface TaskId {
  id: string;
}

export interface TaskData {
  title: string;
  description?: string;
  complete: boolean;
}

export type Task = TaskData & TaskId;
