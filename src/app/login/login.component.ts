import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { UserService } from '../signup/services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(
        public router: Router
        , private toastr: ToastrService
        , public userServices: UserService
        ) {}

    ngOnInit() {}

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }


    onClickLogin(){
        var form = new FormData();                
        form.append("email", $("#inptEmail").val());        
        form.append("password", $("#inptPassword").val());
        this.userServices.login(form).subscribe(resule =>{    
            console.log('resule login', resule);       
            localStorage.setItem('user', JSON.stringify( resule ));

            
            this.toastr.success('User has been successfully login', "Success");                    
            this.router.navigateByUrl('dashboard')
            
        });
    }

    
}
