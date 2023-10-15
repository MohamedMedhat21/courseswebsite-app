import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RolesApiService } from 'src/app/modules/admin-panel/services/roles-api.service';
import { RolesService } from 'src/app/modules/admin-panel/services/roles.service';


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
