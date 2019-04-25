import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskView } from './task.view';

describe('TaskView', () => {
  let component: TaskView;
  let fixture: ComponentFixture<TaskView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
