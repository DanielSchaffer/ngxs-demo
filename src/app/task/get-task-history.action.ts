export class GetTaskHistory {

  public static readonly type = '[TaskHistoryEntry] Get History';

  constructor(public readonly payload: string) {}
}
