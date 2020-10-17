import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private rootURL: string;

  constructor(private http: HttpClient) {
    this.rootURL = '/api';
  }
 
  public findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.rootURL + '/tasks');
  }
 
  public saveTask(task: Task) {
    return this.http.post<Task>(this.rootURL + '/addtask', task);
  }

  public deleteTask(id: number) {
    return this.http.delete(this.rootURL + '/deletetask?taskId=' + id);
  }
}
