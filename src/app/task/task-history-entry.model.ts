import { Task } from './task.model';

export interface TaskHistoryEntryId {
  id: string;
}

export interface TaskHistoryEntryData {
  taskId: string;
  ts: number;
  action: string;
  change: Partial<Task>;
}

export type TaskHistoryEntry = TaskHistoryEntryId & TaskHistoryEntryData;
