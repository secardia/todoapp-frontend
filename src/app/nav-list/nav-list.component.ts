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

  setTasksLists(): void {
    this.tasksListService.listTasksLists().subscribe(data => {
      this.tasksLists = data;
    });
  }

  setShowForm(): void {
    this.showForm = true;
    this.showList = false;
  }

  setSelectedComp(selectedListId: string) {
    /*if (this.selectedList != undefined && this.selectedList != null) {
      document.getElementById(this.selectedList.tasksListId).classList.remove("active");
    }*/
    this.selectedList = this.tasksLists.find(value => value.tasksListId == selectedListId);
    //document.getElementById(this.selectedList.tasksListId).classList.add("active");
    this.showForm = false;
    this.showList = true;
  }

  onSubmitList() {
    var tmpNewList = new TasksList();
    tmpNewList.tasksList = [];
    this.tasksListService.saveTasksList(this.formTasksList).subscribe(newList => {
      this.tasksLists.push(newList);
    });
    this.formTasksList = new TasksList();
    this.showForm = false;
  }

  onSubmitTask() {
    this.selectedList.tasksList.push(this.formTask);
    this.tasksListService.saveTasksList(this.selectedList).subscribe(updatedList => {
        // Update list of task
        var ind = this.tasksLists.indexOf(this.selectedList);
        this.tasksLists[ind] = updatedList;
        this.selectedList = updatedList;
        // Set "active" again because of refresh
        //document.getElementById(this.selectedList.tasksListId).classList.add("active");
        console.log("add active to id "+this.selectedList.tasksListId)

    });    
    this.formTask = new Task();
  }

  deleteTask(taskId: string) {
    this.selectedList.tasksList = this.selectedList.tasksList.filter(task => task.id != taskId);
    this.tasksListService.saveTasksList(this.selectedList).subscribe(updatedList => {
      // Update list of task
      var ind = this.tasksLists.indexOf(this.selectedList);
      this.tasksLists[ind] = updatedList;
      this.selectedList = updatedList;
      // Set "active" again because of refresh
      //document.getElementById(this.selectedList.tasksListId).classList.add("active");
      console.log("add active to id "+this.selectedList.tasksListId)
    });
  }

  checkTask(taskId: string, done: boolean) {
    var ind = this.selectedList.tasksList.findIndex(value => value.id == taskId);
    this.selectedList.tasksList[ind].done = done;
    this.tasksListService.saveTasksList(this.selectedList).subscribe(updatedList => {
        // Update list of task
        var ind = this.tasksLists.indexOf(this.selectedList);
        this.tasksLists[ind] = updatedList;
        this.selectedList = updatedList;
    });
            // Set "active" again because of refresh
            //document.getElementById(this.selectedList.tasksListId).classList.add("active");
            console.log("add active to id "+this.selectedList.tasksListId)
  }

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
