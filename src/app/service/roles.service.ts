import { Injectable } from '@angular/core';
import { Role } from '../model/role.model';
import { Subject, Observable, tap, catchError } from 'rxjs';
import { Constants } from '../utils/Constants';
import { Utils } from '../utils/utils';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private roles:Role[] = [];
  rolesChanged = new Subject<Role[]>();

  constructor(private http: HttpClient) { }

  setRoles(roles:Role[]){
    this.roles = roles;
    this.rolesChanged.next(this.roles.slice());
  }

  getRoles() {
    return this.roles.slice();
  }

  getRole(id:number) {
    return this.roles[id];
  }


  fetchRoles() {
    return <Observable<Role[]>>(
      this.http.get<Role>(`${Constants.apiUrl}/roles`, Constants.options).pipe(
        tap(console.log),
        catchError(Utils.handleError),
        tap((roles) => {
          this.setRoles(roles);
        })
      )
    );
  }
}
