import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRoles } from 'src/app/core/enums/user-roles.enum';
import { Role } from '../admin-panel/models/role.model';
import { AuthService } from './services/auth.service';
import { RouterPaths } from 'src/app/core/enums/router-paths.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = null;
  roles: Role[];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.roles = [
      {
        id: UserRoles.INSTRUCTOR,
        name: 'INSTRUCTOR',
      },
      {
        id: UserRoles.STUDENT,
        name: 'STUDENT',
      },
    ];
  }

  onErrorCloseBtn() {
    this.error = null;
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
    const role = authForm.value.role;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authService.login(username, password).subscribe({
        next:()=>{
          this.isLoading = false;
          this.router.navigate(['/' + RouterPaths.HOME]);
        },
        error:(err)=>{
          this.isLoading = false;
          console.log(err);
          throw Error(err);
        }
      });
    } else {
      this.authService.signup(username, password, email, role.name).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/' + RouterPaths.HOME]);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          throw Error(err);
        },
      });
    }
    authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
