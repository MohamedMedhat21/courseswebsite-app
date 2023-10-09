import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RouterPaths } from 'src/app/enums/router-paths.enum';
import { UserRoles } from 'src/app/enums/user-roles.enum';
import { Lang } from 'src/app/interface/lang';
import { AuthService } from 'src/app/service/auth.service';
import { Constants } from 'src/app/utils/Constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isAuthenticated = false;
  currentRoleId: number;
  currentPath: string;
  routerPaths = RouterPaths;
  userRoles = UserRoles;
  isEng = true;
  langs:Lang[];
  selectedLang:Lang;

  constructor(private authService: AuthService, private router: Router,public translateService:TranslateService) {

  }

  ngOnInit() {
    this.langs = Constants.langs;
    this.selectedLang=JSON.parse(localStorage.getItem('lang')!) || this.langs[1];

    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true; // or you can use !!user
      this.currentRoleId = Constants.CurrentLoggedUser.roleId;
    });

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        //do something on start activity
        this.currentPath = val.url.split('/')[1];
      }
    });
    this.isAuthenticated = Constants.CurrentLoggedUser.id === 0 ? false : true;
  }

  onLogout() {
    this.authService.logout().subscribe();
  }

  onSubmit(searchForm: NgForm){
    Constants.courseFilter.next(searchForm.value.searchQuery);
  }

  onLangChange(){
    this.translateService.use(this.selectedLang.code);
    localStorage.setItem('lang',JSON.stringify(this.selectedLang));
  }
}
