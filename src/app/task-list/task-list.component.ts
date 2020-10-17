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

  tasks: Task[];

  constructor(private router: Router, private taskService: TaskService) { }

  ngOnInit(): void {
    this.setTasks();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => this.setTasks());
  }

  setTasks(): void {
    this.taskService.findAll().subscribe(data => {
      this.tasks = data;
    });
  }

}
