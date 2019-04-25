import { Task, TaskId } from './task.model';

export class UpdateTask {
  public static type = '[Task] Update';

  public readonly payload: Partial<Task> & TaskId;

  constructor(id: string, update: Partial<Task>) {
    this.payload = Object.assign(update, { id });
  }
}
