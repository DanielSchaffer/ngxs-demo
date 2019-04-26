import { Task, TaskId } from './task.model';

export class TaskUpdated {

  public static readonly type = '[Task] Task Updated';

  constructor(public readonly payload: Partial<Task> & TaskId) {}
}
