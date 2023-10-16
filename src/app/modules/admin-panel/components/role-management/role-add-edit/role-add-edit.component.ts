import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Role } from '../../../models/role.model';
import { RolesService } from '../../../services/roles.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-role-add-edit',
  templateUrl: './role-add-edit.component.html',
  styleUrls: ['./role-add-edit.component.css'],
})
export class RoleAddEditComponent {
  id: number;
  roleName: string;

  constructor(
    private rolesService: RolesService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    if (this.config.data) {
      this.roleName = this.config.data.roleDetails.name;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(roleForm: NgForm) {
    if (!roleForm.valid) return;

    this.roleName = roleForm.value.roleName;

    if (this.config.data) {
      this.id = this.config.data.roleDetails.id;
    }

    const role: Role = {
      id: this.id,
      name: this.roleName,
    };

    if (this.config.data) {
      this.rolesService.updateRole(this.config.data.localIndex, role);
    } else {
      this.rolesService.addRole(role);
    }

    this.closeDialog();
  }
}
