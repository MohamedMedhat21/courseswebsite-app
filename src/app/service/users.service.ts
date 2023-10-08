import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../model/user.model';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [];
  usersChanged = new Subject<User[]>();

  constructor(private usersApiService: UsersApiService) {}

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers() {
    return this.users.slice();
  }

  getUser(id: number) {
    return this.users[id];
  }

  addUser(user: any) {
    this.usersApiService.addUserApi(user).subscribe((user) => {
      this.users.push(user);
      this.usersChanged.next(this.users.slice());
    });
  }

  updateUser(index: number, editedUser: any) {
    this.usersApiService.updateUserApi(editedUser).subscribe((res) => {
      this.users[index].email = editedUser.email;
      this.users[index].enabled = editedUser.enabled;
      this.users[index].role.name = editedUser.rolename;

      this.usersChanged.next(this.users.slice());
    });
  }

  deleteUser(index: number) {
    this.usersApiService.deleteUserApi(index).subscribe((res) => console.log(res));
    const localUserId = this.users.findIndex((user) => user.id == index);
    this.users.splice(localUserId, 1);
    this.usersChanged.next(this.users.slice());
  }

  exportUsers() {
    this.usersApiService.downloadFileApi();
  }
}
