import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './services/user.service';
import * as $ from 'jquery';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    constructor(
        private toastr: ToastrService
        , private userService: UserService
    ) { }

    ngOnInit() {}


    onChickRegister(){
        var form = new FormData();
        form.append("name", $("#inptName").val());
        form.append("email", $("#inptEmail").val());
        form.append("mobile", $("#inptMobile").val());
        form.append("password", $("#inptPassword").val());
    
        this.userService.register(form).subscribe(res=> {
          var r: any = res;
          console.log("res", res);      
          this.toastr.success(r.message, "Success");
          //this.userService.show('');
        },error=>{
          console.log("error", error);
          error.error.error.forEach(el => {
            this.toastr.error(el, "Error");
            
          });
          
        });
    }


    //login
}
