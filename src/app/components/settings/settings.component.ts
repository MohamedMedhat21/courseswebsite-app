import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  showMySidebar = true;

  toggleSidebar(){
    this.showMySidebar = !this.showMySidebar;
  }
}
