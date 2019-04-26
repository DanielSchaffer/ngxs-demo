import { TaskHistoryEntryId } from './task-history-entry.model';

export class GetTaskHistory {

  public static readonly type = '[TaskHistoryEntry] Get History';

  constructor(public readonly payload: TaskHistoryEntryId) {}
}
