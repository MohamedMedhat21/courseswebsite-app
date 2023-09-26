import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/service/users.service';
import { UserAddEditComponent } from './user-management/user-add-edit/user-add-edit.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  sidebarVisible = false;
  userManagementVisible = true;
  roleManagementVisible = false;

}
