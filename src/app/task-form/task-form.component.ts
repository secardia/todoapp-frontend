import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../model/task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  task: Task;

  constructor(private router: Router, private taskService: TaskService) { }

  ngOnInit() {
    this.task = new Task();
  }

  onSubmit() {
    this.taskService.save(this.task).subscribe(result => this.gotoUserList());
  }
 
  gotoUserList() {
    this.router.navigate(['/tasks']);
  }

}