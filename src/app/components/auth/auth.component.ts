import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService,private router:Router) {}

  onErrorCloseBtn(){
    this.error=null;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(authForm: NgForm) {

    this.error = null;

    if (!authForm.valid) return;

    const username = authForm.value.username;
    const password = authForm.value.password;
    const email = authForm.value.email;
    const rolename = authForm.value.rolename;

    this.isLoading = true;

    if(this.isLoginMode){
      this.authService.login(username,password).subscribe(res => {
        // console.log(res)
        this.isLoading = false;
        this.router.navigate(['/home']);
      }
      ,errorRes =>{
        this.isLoading=false;
        console.log(errorRes);
        throw Error(errorRes)
        // this.error = errorRes.error.error.message;
      }
      )
    }
    else{

      this.authService.signup(username,password,email,rolename).subscribe( res => {
        // console.log(res);
        this.isLoading=false;
        // this.router.navigate(['/home']);
      }
      ,errorRes =>{
        this.isLoading=false;
        console.log(errorRes);
        throw Error(errorRes);
        // this.error = errorRes.error.error.message;
      }
      );
    }
    authForm.reset();

  }

  onHandleError(){
    this.error=null;
  }

}
