import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Role } from '../../../models/role.model';
import { RolesService } from '../../../services/roles.service';
import { UsersService } from '../../../services/users.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

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
  enabled = true;
  role :Role;
  roles:Role[];

  constructor(
    private userService: UsersService,
    private roleService:RolesService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {}

  ngOnInit() {
    if (this.config.data){
      this.username = this.config.data.userDetails.username;
      this.email = this.config.data.userDetails.email;
      this.enabled = this.config.data.userDetails.enabled;
      this.role = this.config.data.userDetails.role;
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

    const enabledString = Number(userForm.value.enabledCheckbox);

    if (this.config.data){
      this.id = this.config.data.userDetails.id;
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

    if (this.config.data){
      this.userService.updateUser(this.config.data.localIndex,user,this.role);
    }
    else{
      this.userService.addUser(user);
    }

    // userForm.reset();
    this.closeDialog();
  }
}
