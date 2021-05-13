import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from './../../shared';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';

@NgModule({
    imports: [CommonModule, TestRoutingModule, PageHeaderModule],
    declarations: [TestComponent]
})
export class TestModule {}
