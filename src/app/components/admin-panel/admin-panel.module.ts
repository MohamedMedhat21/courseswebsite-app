import { NgModule } from '@angular/core';
import { AdminPanelComponent } from './admin-panel.component';
import { RoleAddEditComponent } from './role-management/role-add-edit/role-add-edit.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { UserAddEditComponent } from './user-management/user-add-edit/user-add-edit.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';



@NgModule({
  declarations: [
    AdminPanelComponent,
    UserManagementComponent,
    UserAddEditComponent,
    RoleManagementComponent,
    RoleAddEditComponent
  ],
  imports: [
    SharedModule,
    AdminPanelRoutingModule
  ],
})
export class AdminPanelModule { }
