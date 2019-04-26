import { Task } from './task.model';

export class TaskAdded {

  public static readonly type = '[Task] Task Added';

  constructor(public readonly payload: Task) {}
}
