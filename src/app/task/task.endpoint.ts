import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NOT_FOUND } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from './task.model';

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

  public addTask(task: Task): Observable<Task> {
    return this.http.post<Task>('/api/task', task);
  }

}
