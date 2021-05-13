import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewModuleRoutingModule } from './new-module-routing.module';
import { NewComponentComponent } from './new-component.component';


@NgModule({
  declarations: [NewComponentComponent],
  imports: [
    CommonModule,
    NewModuleRoutingModule
  ]
})
export class NewModuleModule { }
