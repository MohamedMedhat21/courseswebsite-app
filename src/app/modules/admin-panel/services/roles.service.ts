import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RolesApiService } from './roles-api.service';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private roles:Role[] = [];
  rolesChanged = new Subject<Role[]>();

  constructor(private rolesAPiService:RolesApiService) { }

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
    this.rolesAPiService.addRoleApi(role).subscribe(role=>{
      this.roles.push(role);
      this.rolesChanged.next(this.roles.slice());
    });
  }

  updateRole(index: number, editedRole:Role) {
    this.rolesAPiService.updateRoleApi(editedRole).subscribe(res=>{
      this.roles[index].name = editedRole.name;
      this.rolesChanged.next(this.roles.slice());
    });

  }

  deleteRole(index: number) {
    this.rolesAPiService.deleteRoleApi(index).subscribe(res => console.log(res));
    const localRoleId = this.roles.findIndex(role => role.id == index);
    this.roles.splice(localRoleId, 1);
    this.rolesChanged.next(this.roles.slice());
  }

}
