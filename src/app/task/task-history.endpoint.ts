import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TaskHistoryEntry, TaskHistoryEntryData, TaskHistoryEntryId } from './task-history-entry.model';

@Injectable()
export class TaskHistoryEndpoint {

  constructor(private http: HttpClient) {}

  public getList(taskId: TaskHistoryEntryId): Observable<TaskHistoryEntry[]> {
    return this.http.get<TaskHistoryEntry[]>(`/api/task/${taskId.id}/history`);
  }

  public addEntry(entry: TaskHistoryEntryData): Observable<TaskHistoryEntry> {
    return this.http.post<TaskHistoryEntry>(`/api/task/${entry.taskId}/history`, entry);
  }

}
