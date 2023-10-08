import { Injectable } from '@angular/core';
import { Role } from '../model/role.model';
import { Observable, tap, catchError } from 'rxjs';
import { Constants } from '../utils/Constants';
import { Utils } from '../utils/utils';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesApiService {

  constructor(private http: HttpClient) { }

  fetchRoles() {
    return <Observable<Role[]>>(
      this.http.get<Role>(`${Constants.apiUrl}/roles`).pipe(
        tap(console.log),
        catchError(Utils.handleError)
      )
    );
  }

  addRoleApi(role:Role){
    return <Observable<Role>>(
      this.http.post(`${Constants.apiUrl}/roles`,role).pipe(
        tap(console.log),
        catchError(Utils.handleError)
      )
    );
  }

  updateRoleApi(role:Role){
    return <Observable<never>>(
      this.http.put(`${Constants.apiUrl}/roles`,role).pipe(
        tap(console.log),
        catchError(Utils.handleError)
      )
    );
  }

  deleteRoleApi(roleId:number){
    return (
      this.http.delete<void>(`${Constants.apiUrl}/roles/${roleId}`).pipe(
        catchError(Utils.handleError)
      )
    );
  }
}
