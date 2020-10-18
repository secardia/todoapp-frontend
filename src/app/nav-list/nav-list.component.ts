import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { TasksList } from '../model/tasks-list';
import { TasksListService } from '../service/tasks-list.service';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.css']
})
export class NavListComponent implements OnInit {
  // To chose what we show
  showForm: boolean;
  showList: boolean;
  // The lists
  tasksLists: TasksList[];
  // The selected list index
  selectedList: TasksList;
  // The list corresponding to the form
  formTasksList: TasksList;
  // The task corresponding to the form
  formTask: Task;

  constructor(private tasksListService: TasksListService) { }

  ngOnInit(): void {
    this.showForm = false;
    this.showList = false;
    this.setTasksLists();
    this.formTasksList = new TasksList();
    this.formTask = new Task();
  }

  // Get the tasks lists from de server
  setTasksLists(): void {
    this.tasksListService.listTasksLists().subscribe(data => {
      this.tasksLists = data;
    });
  }

  // Set the values when click on "Add list"
  setShowFormAddList(): void {
    this.showForm = true;
    this.showList = false;
    this.selectedList = null;
  }

  // Update the selected list when click on a list
  setSelectedList(selectedListId: string) {
    this.selectedList = this.tasksLists.find(value => value.tasksListId == selectedListId);
    this.showForm = false;
    this.showList = true;
  }

  // Add the list on server and to the tasks lists when click on "Add list"
  onSubmitList() {
    this.tasksListService.saveTasksList(this.formTasksList).subscribe(newList => {
      this.tasksLists.push(newList);
    });
    this.formTasksList = new TasksList();
    this.showForm = false;
  }

  // Add the task to the list, update the list on the server and on vars
  onSubmitTask() {
    this.selectedList.tasksList.push(this.formTask);
    this.tasksListService.saveTasksList(this.selectedList).subscribe(updatedList => {
        // Update list of task
        var ind = this.tasksLists.indexOf(this.selectedList);
        this.tasksLists[ind] = updatedList;
        this.selectedList = updatedList;
    });    
    this.formTask = new Task();
  }

  // Delete the list on the server and on tasks lists
  deleteTask(taskId: string) {
    this.selectedList.tasksList = this.selectedList.tasksList.filter(task => task.id != taskId);
    this.tasksListService.saveTasksList(this.selectedList).subscribe(updatedList => {
      // Update list of task
      var ind = this.tasksLists.indexOf(this.selectedList);
      this.tasksLists[ind] = updatedList;
      this.selectedList = updatedList;
    });
  }

  // Check the task, update the list on the server and on vars
  checkTask(taskId: string, done: boolean) {
    var ind = this.selectedList.tasksList.findIndex(value => value.id == taskId);
    this.selectedList.tasksList[ind].done = done;
    this.tasksListService.saveTasksList(this.selectedList).subscribe(updatedList => {
        // Update list of task
        var ind = this.tasksLists.indexOf(this.selectedList);
        this.tasksLists[ind] = updatedList;
        this.selectedList = updatedList;
    });
  }

  // Delete the task, update the list on the server and on vars
  deleteCurrentTasksList() {
    var result = confirm("Are you sure you want delete this list ?");
    if (result == true) {
      this.tasksListService.deleteTasksList(this.selectedList.tasksListId).subscribe();
      this.tasksLists = this.tasksLists.filter(tasksList => tasksList.tasksListId != this.selectedList.tasksListId);
      this.selectedList = null;
      this.showList = false;
    }
  }


}
