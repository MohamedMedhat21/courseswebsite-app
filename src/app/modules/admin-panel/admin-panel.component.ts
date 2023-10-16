import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent {

  items: MenuItem[]=[
    {
      label: this.translateService.instant(
        'ADMIN_PANEL_PAGE.user_management'
      ),
      icon: 'pi pi-fw pi-users',
    },
    {
      label: this.translateService.instant(
        'ADMIN_PANEL_PAGE.role_management'
      ),
      icon: 'pi pi-fw pi-key',
    },
  ];;

  activeItem: MenuItem=this.items[0];

  constructor(public translateService: TranslateService) {}

  ngOnInit() {
    console.log('hep');
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.items = [
        {
          label: this.translateService.instant(
            'ADMIN_PANEL_PAGE.user_management'
          ),
          icon: 'pi pi-fw pi-users',
        },
        {
          label: this.translateService.instant(
            'ADMIN_PANEL_PAGE.role_management'
          ),
          icon: 'pi pi-fw pi-key',
        },
      ];
      this.activeItem = this.items[0];
    });
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
