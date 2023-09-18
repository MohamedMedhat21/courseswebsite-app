import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../service/users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService {

  constructor(private usersService:UsersService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const users = this.usersService.getUsers();
    if(users.length === 0){
      return this.usersService.fetchUsers();
    }
    return users;
  }
}
