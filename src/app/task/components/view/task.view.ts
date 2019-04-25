import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-task-view',
  templateUrl: './task.view.html',
  styleUrls: ['./task.view.scss']
})
// tslint:disable-next-line:component-class-suffix
export class TaskView {

  @HostBinding('class')
  public cssClasses = 'col-12';

}
