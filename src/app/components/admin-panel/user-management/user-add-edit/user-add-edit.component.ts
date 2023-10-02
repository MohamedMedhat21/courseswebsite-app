import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/model/role.model';
import { RolesService } from 'src/app/service/roles.service';
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
  enabled :boolean;
  role :Role;
  roles:Role[];

  constructor(
    private userService: UsersService,
    private roleService:RolesService,
    public dialogRef: MatDialogRef<UserAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data){
      this.username = this.data.userDetails.username;
      this.email = this.data.userDetails.email;
      this.enabled = this.data.userDetails.enabled;
      this.role = this.data.userDetails.role;
    }

    this.roleService.rolesChanged.subscribe(roles =>{
      this.roles = roles;
    })

    this.roles = this.roleService.getRoles();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(userForm: NgForm) {

    if (!userForm.valid) return;

    this.username = userForm.value.username;
    this.email = userForm.value.email;
    this.enabled = userForm.value.enabledCheckbox;
    this.role = userForm.value.role;

    const enabledString = this.enabled === true ? 1 : 0;

    if (this.data){
      this.id = this.data.userDetails.id;
    }
    else{
      this.password = userForm.value.password;
    }

    const user = {
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email,
      enabled: enabledString,
      rolename: this.role.name,
    };

    if (this.data){
      this.userService.updateUser(this.data.localIndex,user);
    }
    else{
      this.userService.addUser(user);
    }


    userForm.reset();
    this.closeDialog();
  }
}
