import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,router: RouterStateSnapshot):| boolean | UrlTree | Promise<boolean | UrlTree>
| Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if(isAuth) {
          if(route.routeConfig?.path === 'adminPanel' && user.roleId !== 1)
            return this.router.createUrlTree(['/home']);
          if(route.routeConfig?.path === 'publishedCourses' && user.roleId !== 2)
            return this.router.createUrlTree(['/home']);
          if(route.routeConfig?.path === 'enrollments' && user.roleId !== 3)
            return this.router.createUrlTree(['/home']);
          return true;
        }
        return this.router.createUrlTree(['/home']);
      })
    );
  }
}
