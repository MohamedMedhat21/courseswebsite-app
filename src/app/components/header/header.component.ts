import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true; // or you can use !!user
      this.currentRoleId = Constants.CurrentRoleId;
    });

    this.router.events.subscribe((val) => {
      // console.log(val)
      if (val instanceof NavigationStart) {
        //do something on start activity
        this.currentPath = val.url.split('/')[1]
      }
    });
    this.isAuthenticated = Constants.CurrentUserId === 0 ? false : true;

  }

  onLogout() {
    this.authService.logout();
  }
}
