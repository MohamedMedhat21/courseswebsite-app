import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  sidebarVisible = false;
  userManagementVisible = true;
  roleManagementVisible = false;

  constructor(public translateService:TranslateService){

  }

}
