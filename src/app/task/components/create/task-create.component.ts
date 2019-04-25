import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { AddTask } from '../../add-task.action';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {

  public readonly addTaskForm: FormGroup;

  @ViewChild('title')
  private titleEl: ElementRef;

  constructor(private fb: FormBuilder, private store: Store) {
    this.addTaskForm = this.createForm();
  }


  public addTask(form: FormGroup): void {
    this.store.dispatch(new AddTask(form.value));
    this.resetForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: [''],
      complete: [false],
    });
  }

  private resetForm(): void {
    this.addTaskForm.reset({});
    this.titleEl.nativeElement.focus();
  }

}
