import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../service/users.service';
import { UsersApiService } from '../service/users-api.service';

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
