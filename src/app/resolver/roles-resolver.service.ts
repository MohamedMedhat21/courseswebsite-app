import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RolesService } from '../service/roles.service';

@Injectable({
  providedIn: 'root'
})
export class RolesResolverService {

  constructor(private rolesService:RolesService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const roles = this.rolesService.getRoles();
    if(roles.length === 0){
      return this.rolesService.fetchRoles();
    }
    return roles;
  }
}
