import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NOT_FOUND } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task, TaskId, TaskData } from './task.model';

@Injectable()
export class TaskEndpoint {

  constructor(private http: HttpClient) {}

  public getList(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/task')
      .pipe(catchError(err => {
        if (err.status === NOT_FOUND) {
          return of([]);
        }
        return throwError(err);
      }));
  }

  public getTask(taskId: TaskId): Observable<Task> {
    return this.http.get<Task>(`/api/task/${taskId.id}`);
  }

  public addTask(task: TaskData): Observable<Task> {
    return this.http.post<Task>('/api/task', task);
  }

  public updateTask(task: Partial<Task> & TaskId): Observable<Task> {
    return this.http.patch<Task>(`/api/task/${task.id}`, task);
  }

  public deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`/api/task/${task.id}`);
  }

}
