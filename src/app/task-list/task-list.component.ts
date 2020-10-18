import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../model/task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  // All tasks
  tasks: Task[];
  // Task to add
  task: Task;

  constructor(private router: Router, private taskService: TaskService) { }

  ngOnInit(): void {
    this.setTasks();
    this.task = new Task();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => this.setTasks());
  }

  checkTask(id: number, checked: boolean): void {
    this.taskService.checkTask(id, checked).subscribe(() => this.setTasks());
  }

  setTasks(): void {
    this.taskService.findAll().subscribe(data => {
      this.tasks = data;
    });
  }

  onSubmit() {
    this.taskService.saveTask(this.task).subscribe(result => this.pushTask(result));
  }

  pushTask(task: Task) {
    this.tasks.push(task);
    this.task = new Task();
  }

}
