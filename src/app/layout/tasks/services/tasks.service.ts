import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { TasksModel } from '../models/tasks.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  AllTasks = new BehaviorSubject<TasksModel[]>(null);
  private baseURL = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) { 
    console.log('AllTasks !!', this.AllTasks );

    this.show('');
  }


  add(form):Observable<TasksModel>{
    return this.http.post<TasksModel>(this.baseURL+'task/add', form);
  }

  delete(id){
    return this.http.post(this.baseURL+'task/delete?id='+id, null);
  }

  update(form){
    return this.http.post(this.baseURL+'task/update', form);
  }

  // getTasks():Observable<Task>{
  //   return this.http.get<Task>(this.server+'get');
  // }

  view():Observable<TasksModel>{
    return this.http.get<TasksModel>(this.baseURL+'task/view');
  }

  show(keys){

    console.log("DB request !");

    return this.http.post(this.baseURL+'task/show?keywords='+keys, null).subscribe( res=>{
      var r:any = res;
      console.log(' this.AllTasks',  this.AllTasks);

      this.AllTasks.next(r.tasks);

    });
  }

}
