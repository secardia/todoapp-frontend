import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksList } from '../model/tasks-list';

@Injectable({
  providedIn: 'root'
})
export class TasksListService {

  private rootURL: string;

  constructor(private http: HttpClient) {
    this.rootURL = '/api';
  }

  // Get all the tasks lists
  listTasksLists(): Observable<TasksList[]> {
    return this.http.get<TasksList[]>(this.rootURL + '/taskslists');
  }

  // Save the tasks list
  saveTasksList(tasksList: TasksList): Observable<TasksList> {
    return this.http.post<TasksList>(this.rootURL + '/savetasklist', tasksList);
  }

  // Delete the tasks list
  deleteTasksList(tasksListId: string) {
    return this.http.delete<TasksList>(this.rootURL + '/deletetaskslist?tasksListId='+ tasksListId);
  }

}
