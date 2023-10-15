import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from '../../../models/role.model';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-role-add-edit',
  templateUrl: './role-add-edit.component.html',
  styleUrls: ['./role-add-edit.component.css']
})
export class RoleAddEditComponent {

  id:number;
  roleName:string;

  constructor(
    private rolesService: RolesService,
    public dialogRef: MatDialogRef<RoleAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data){
      this.roleName = this.data.roleDetails.name;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(roleForm: NgForm) {

    if (!roleForm.valid) return;

    this.roleName = roleForm.value.roleName;

    if (this.data){
      this.id = this.data.roleDetails.id;
    }

    const role:Role = {
      id: this.id,
      name: this.roleName,
    };

    if (this.data){
      this.rolesService.updateRole(this.data.localIndex,role);
    }
    else{
      this.rolesService.addRole(role);
    }


    roleForm.reset();
    this.closeDialog();
  }

}
