import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { DeleteTask } from '../../delete-task.action';
import { Task } from '../../task.model';
import { UpdateTask } from '../../update-task.action';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tr[app-task-list-item]',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {

  @Input()
  public task: Task;

  @HostBinding('class.task-complete')
  public get cssClasses() {
    return this.task && this.task.complete;
  }

  // tslint:disable-next-line:variable-name
  private _editMode: boolean;
  public get editMode(): boolean {
    return this._editMode;
  }

  public editForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.editForm = this.fb.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description],
    });
  }

  public markComplete(): void {
    this.store.dispatch(new UpdateTask(this.task.id, { complete: true }));
  }

  public markIncomplete(): void {
    this.store.dispatch(new UpdateTask(this.task.id, { complete: false }));
  }

  public delete(): void {
    this.store.dispatch(new DeleteTask(this.task));
  }

  public startEdit(): void {
    this._editMode = true;
  }

  public completeEdit(): void {
    if (this.editForm.dirty) {
      this.store.dispatch(new UpdateTask(this.task.id, this.getDirtyValues()));
      // this.store.selectOnce(TaskState.getTasks)
    }
    this._editMode = false;
  }

  public cancelEdit(): void {
    this.editForm.reset(this.task);
    this._editMode = false;
  }

  private getDirtyValues(): Partial<Task> {
    return Object.keys(this.editForm.controls)
      .reduce((result: Partial<Task>, name: string) => {
        const control = this.editForm.controls[name];
        if (control.dirty) {
          result[name] = control.value;
        }
        return result;
      }, {});
  }

}
