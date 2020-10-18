import { Task } from './task';

export class TasksList {
    tasksListId: string;
    name: string;
    tasksList: Task[];

    constructor() {
        this.tasksList = new Array();
    }
}