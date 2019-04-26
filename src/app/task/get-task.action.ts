import { TaskId } from './task.model';

export class GetTask {

  public static readonly type = '[Task] Get Task';

  constructor(public readonly payload: TaskId) {}
}
