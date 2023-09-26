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

  addRole(role:any) {
    this.addRoleApi(role).subscribe(role=>{
      this.roles.push(role);
      this.rolesChanged.next(this.roles.slice());
    });
  }

  updateRole(index: number, editedRole:Role) {
    this.updateRoleApi(editedRole).subscribe(res=>{
      this.roles[index].name = editedRole.name;
      this.rolesChanged.next(this.roles.slice());
    });

  }

  deleteRole(index: number) {
    this.deleteRoleApi(index).subscribe(res => console.log(res));
    const localRoleId = this.roles.findIndex(role => role.id == index);
    this.roles.splice(localRoleId, 1);
    this.rolesChanged.next(this.roles.slice());
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

  private addRoleApi(role:Role){
    return <Observable<Role>>(
      this.http.post(`${Constants.apiUrl}/roles`,role,Constants.options).pipe(
        tap(console.log)
      )
    );
  }

  private updateRoleApi(role:Role){
    return <Observable<never>>(
      this.http.put(`${Constants.apiUrl}/roles`,role,Constants.options).pipe(
        // tap(console.log),
      )
    );
  }

  deleteRoleApi(roleId:number){
    return (
      this.http.delete<void>(`${Constants.apiUrl}/roles/${roleId}`, Constants.options)
    );
  }
}
