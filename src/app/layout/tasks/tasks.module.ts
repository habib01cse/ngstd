import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';



@NgModule({
  declarations: [TasksComponent],
  imports: [
    FormsModule,
    CommonModule,
    TasksRoutingModule, 
    PageHeaderModule
  ]
})
export class TasksModule { }
