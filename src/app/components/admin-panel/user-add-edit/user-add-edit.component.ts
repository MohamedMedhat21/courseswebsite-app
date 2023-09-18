import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css'],
})
export class UserAddEditComponent {
  id: number;
  editMode = false;

  constructor(private userService:UsersService){

  }

  onSubmit(userForm: NgForm) {

    if (!userForm.valid) return;

    const username = userForm.value.username;
    const password = userForm.value.password;
    const email = userForm.value.email;
    let enabled = userForm.value.enabled;
    const roleName = userForm.value.roleName;
    enabled = true;
    const enabledString = enabled == true ? '1':'0';

    const user = {
      'id':0,
      'username':username,
      'password':password,
      'email':email,
      'enabled':enabledString,
      'rolename':roleName
    }

    if(this.editMode){

    }
    else{
      this.userService.addUser(user)
    }

    userForm.reset();
  }
}
