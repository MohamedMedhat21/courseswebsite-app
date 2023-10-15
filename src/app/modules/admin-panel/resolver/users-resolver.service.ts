import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersApiService } from 'src/app/modules/admin-panel/services/users-api.service';
import { UsersService } from 'src/app/modules/admin-panel/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService {

  constructor(private usersService:UsersService,private usersApiService:UsersApiService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const users = this.usersService.getUsers();
    if(users.length === 0){
      return this.usersApiService.fetchUsers().subscribe(usrs=>{
        this.usersService.setUsers(usrs);
      });
    }
    return users;
  }
}
