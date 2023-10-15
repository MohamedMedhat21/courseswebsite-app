import { NgModule } from '@angular/core';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { UserAddEditComponent } from './components/user-management/user-add-edit/user-add-edit.component';
import { RoleAddEditComponent } from './components/role-management/role-add-edit/role-add-edit.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    UserManagementComponent,
    RoleManagementComponent,
    UserAddEditComponent,
    RoleAddEditComponent,
  ],
  imports: [
    SharedModule,
    AdminPanelRoutingModule
  ],
})
export class AdminPanelModule { }
