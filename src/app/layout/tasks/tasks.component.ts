import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ToastrService } from 'ngx-toastr';

import * as $  from 'jquery';
import { TasksModel } from './models/tasks.model';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [routerTransition()]

})
export class TasksComponent implements OnInit {  
  AllTasks:TasksModel[];
  id:any = "";
  title = 'backendng';
  public taskObj = new TasksModel();

  constructor(
    private taskService: TasksService
   , private toastr: ToastrService
    ) {   
      this.taskService.AllTasks.subscribe(res=>{              
        this.AllTasks = res;        
      })

  } 


  
 view(){
  this.taskService.view().subscribe(res=> { 
    console.log('res', res);    
    console.log('res type', typeof res);    
  });
 }

  ngOnInit() {
    console.log('taskObj', this.taskObj);
  }

  showSuccess() {
    //this.toastr.success('Hello world!', 'Toastr fun!');
  }

  new(){
    this.taskObj = new TasksModel();
  }

  add(){
    // var form = new FormData();
    // form.append("name", $("#addInputName").val());
    // form.append("status", $("#addInputStatus").val());

    this.taskService.add(this.taskObj).subscribe(res=> {
      var r: any = res;
      console.log("res", res);      
      this.toastr.success(r.message, "Success");
      console.log("save successfully");
      this.taskService.show('');
    },error=>{
      console.log("error", error);
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
        console.log("save failed");
        
      });
      
    });
  }

  updateModelShow(task){
    this.taskObj = task;

    // $("#addInputName").prop("value", this.taskObj['name']);
    // $("#addInputStatus").prop("value", this.taskObj['status']);

    // old way
    // this.AllTasks.forEach(el=>{
    //   if( id == el.id ){
    //     this.id = el.id;
    //     $("#addInputName").prop("value", el.name);
    //     $("#addInputStatus").prop("value", el.status);
    //   }
    // });
  }

  update(){    
    // var form = new FormData();
    // form.append("id", this.taskObj['id']);
    // form.append("name", $("#addInputName").val());
    // form.append("status", $("#addInputStatus").val());

    console.log('this.taskObj', this.taskObj )

    this.taskService.update(this.taskObj).subscribe(res=> {
      var r: any = res;
      console.log("res", res);      
      this.toastr.success(r.message, "Success");
      this.taskService.show('');
      this.taskObj = new TasksModel();
    },error=>{
      console.log("error", error);
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
        this.taskObj = new TasksModel();        
      });
      
    });
  }

  // search(v){
  //   this.taskService.show(v);
  // }

  delete(id){
    this.taskService.delete(id).subscribe(res=> {
      var r: any = res;
      console.log("res", res);      
      this.toastr.success(r.message, "Success");
      this.taskService.show('');
    },error=>{
      console.log("error", error);
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
        
      });
      
    });

  }
  

}
