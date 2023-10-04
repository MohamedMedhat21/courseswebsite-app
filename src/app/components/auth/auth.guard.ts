import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { RouterPaths } from 'src/app/enums/router-paths.enum';
import { UserRoles } from 'src/app/enums/user-roles.enum';
import { AuthService } from 'src/app/service/auth.service';

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
          if(route.routeConfig?.path === RouterPaths.adminPanel && user.roleId !== UserRoles.ADMIN){
            return this.router.createUrlTree(['/home']);
          }
          if(route.routeConfig?.path === RouterPaths.publishedCourses && user.roleId !== UserRoles.INSTRUCTOR)
            return this.router.createUrlTree(['/home']);
          if(route.routeConfig?.path === RouterPaths.enrollments && user.roleId !== UserRoles.STUDENT)
            return this.router.createUrlTree(['/home']);
          return true;
        }
        return this.router.createUrlTree(['/home']);
      })
    );
  }
}
