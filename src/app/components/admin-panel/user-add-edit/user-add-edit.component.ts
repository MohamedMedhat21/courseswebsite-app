import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css'],
})
export class UserAddEditComponent {
  error: any;
  id:number;
  username : string;
  password : string;
  email :string;
  enabled :string;
  roleName :string;

  constructor(
    private userService: UsersService,
    public dialogRef: MatDialogRef<UserAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data){
      this.id
      this.username = this.data.userDetails.username;
      this.email = this.data.userDetails.email;
      this.enabled = this.data.userDetails.enabled;
      this.roleName = this.data.userDetails.role.name;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(userForm: NgForm) {
    this.error = null;

    if (!userForm.valid) return;

    this.username = userForm.value.username;
    this.email = userForm.value.email;
    this.enabled = userForm.value.enabled;
    this.roleName = userForm.value.roleName;

    this.enabled = "true";

    const enabledString = this.enabled == "true" ? 1 : 0;

    if (this.data.userDetails){
      this.id = this.data.userDetails.id;
    }
    else{
      this.id = 0
      this.password = userForm.value.password;
    }

    const user = {
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email,
      enabled: enabledString,
      rolename: this.roleName,
    };

    if (this.data.userDetails){
      this.userService.updateUser(this.data.localIndex,user);
    }
    else{
      this.userService.addUser(user);
    }


    userForm.reset();
    this.closeDialog();
  }

  // onErrorCloseBtn(){
  //   this.error=null;
  // }
}
