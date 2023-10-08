import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RolesService } from '../service/roles.service';
import { RolesApiService } from '../service/roles-api.service';

@Injectable({
  providedIn: 'root'
})
export class RolesResolverService {

  constructor(private rolesService:RolesService,private rolesServiceApi:RolesApiService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const roles = this.rolesService.getRoles();
    if(roles.length === 0){
      return this.rolesServiceApi.fetchRoles().subscribe(roles =>{
        this.rolesService.setRoles(roles);
      });
    }
    return roles;
  }
}
