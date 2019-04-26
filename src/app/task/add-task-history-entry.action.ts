import { Task, TaskId } from './task.model';

import { TaskHistoryEntryData } from './task-history-entry.model';

export class AddTaskHistoryEntry {

  public static readonly type = '[TaskHistoryEntry] Add';

  public readonly payload: TaskHistoryEntryData;

  constructor(action: string, data: Partial<Task> & TaskId) {
    this.payload = Object.assign({
      taskId: data.id,
      action,
      ts: new Date().valueOf(),
      change: data,
    });
  }

}
