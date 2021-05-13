import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Allusers = new BehaviorSubject<UserModel[]>(null);
  private baseURL = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) { 
    //this.show('');
  }


  register(form){
    return this.http.post(this.baseURL+'register', form);
  }

  login(form){
    return this.http.post(this.baseURL+'login', form);
  }

  // delete(id){
  //   return this.http.post(this.baseURL+'delete?id='+id, null);
  // }

  // update(form){
  //   return this.http.post(this.baseURL+'update', form);
  // }

  // show(keys){

  //   console.log("DB request !");

  //   return this.http.post(this.baseURL+'show?keywords='+keys, null).subscribe( res=>{
  //     var r:any = res;
  //     this.Allusers.next(r.users);

  //   });
  // }

}
