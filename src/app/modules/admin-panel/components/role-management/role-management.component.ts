import { Component } from '@angular/core';
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';
import { Role } from '../../models/role.model';
import { RolesService } from '../../services/roles.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/core/utils/Constants';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css'],
  providers: [DialogService],
})
export class RoleManagementComponent {
  roles: Role[];
  dialogRef: DynamicDialogRef | undefined;

  constructor(
    private roleService: RolesService,
    public dialogService: DialogService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.roleService.rolesChanged.subscribe((roles) => {
      this.roles = roles;
    });

    this.roles = this.roleService.getRoles();
  }


  openRoleDialog() {
    this.dialogRef = this.dialogService.open(RoleAddEditComponent, {
      header: this.translateService.instant('ADMIN_PANEL_PAGE.new_role_btn'),
      width: Constants.DialogWidth,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  onDelete(id: number) {
    const isDelete = confirm('are you sure you want to delete this role?');
    if (isDelete) {
      this.roleService.deleteRole(id);
    }
  }

  onEdit(localIndex: number, id: number) {
    const data = {
      roleDetails: this.roles[localIndex],
      localIndex: localIndex,
    };

    this.dialogRef = this.dialogService.open(RoleAddEditComponent, {
      header: this.translateService.instant('ADMIN_PANEL_PAGE.update_role_btn'),
      width: Constants.DialogWidth,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: data,
    });
  }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
