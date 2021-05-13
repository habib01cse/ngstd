import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import * as $ from 'jquery'

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    //styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class TestComponent implements OnInit {
    constructor() {}

    ngOnInit() {}


    add(){
        var form = new FormData();
        form.append("name", $("#addInputName").val());
        form.append("mobile", $("#addInputStatus").val());

        console.log("form", form);

        
    
        // this.myService.add(form).subscribe(res=> {
        //   var r: any = res;
        //   console.log("res", res);      
        //   this.toastr.success(r.message, "Success");
        //   this.myService.show('');
        // },error=>{
        //   console.log("error", error);
        //   error.error.error.forEach(el => {
        //     this.toastr.error(el, "Error");
            
        //   });
          
        // });


      }
}
