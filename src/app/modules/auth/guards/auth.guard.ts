import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { RouterPaths } from '../../../core/enums/router-paths.enum';
import { UserRoles } from '../../../core/enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot):| boolean | UrlTree | Promise<boolean | UrlTree>
| Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if(isAuth) {
          if(route.routeConfig?.path === RouterPaths.ADMIN_PANEL && user.roleId !== UserRoles.ADMIN){
            return this.router.createUrlTree(['/'+RouterPaths.HOME]);
          }
          if(route.routeConfig?.path === RouterPaths.PUBLISHED_COURSES && user.roleId !== UserRoles.INSTRUCTOR)
            return this.router.createUrlTree(['/'+RouterPaths.HOME]);
          if(route.routeConfig?.path === RouterPaths.ENROLLMENTS && user.roleId !== UserRoles.STUDENT)
            return this.router.createUrlTree(['/'+RouterPaths.HOME]);
          return true;
        }
        return this.router.createUrlTree(['/'+RouterPaths.HOME]);
      })
    );
  }
}
