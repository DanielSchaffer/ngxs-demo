import { Task } from './task.model';

export class DeleteTask {
  public static type = '[Task] Delete';

  constructor(public readonly payload: Task) {}

}
