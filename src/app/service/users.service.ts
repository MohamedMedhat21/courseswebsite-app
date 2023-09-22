import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Constants } from '../utils/Constants';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: User[] = [];
  usersChanged = new Subject<User[]>();
  // errorMessage:string

  constructor(private http: HttpClient){

  }


  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers() {
    return this.users.slice();
  }

  getUser(index: number) {
    return this.users[index];
  }

  addUser(user:any) {
    this.addUserApi(user).subscribe(user=>{
      this.users.push(user);
      this.usersChanged.next(this.users.slice());
    });
    // console.log(this.errorMessage)
  }

  updateUser(index: number, editedUser:any) {
    this.updateUserApi(editedUser).subscribe(res=>{
      this.users[index].email = editedUser.email;
      this.users[index].enabled = editedUser.enabled;
      this.users[index].role.name = editedUser.rolename

      this.usersChanged.next(this.users.slice());
    });

  }

  deleteUser(index: number) {
    this.deleteUserApi(index).subscribe(res => console.log(res));
    const localUserId = this.users.findIndex(user => user.id == index);
    this.users.splice(localUserId, 1);
    this.usersChanged.next(this.users.slice());
  }

  fetchUsers() {
    return <Observable<User[]>>(
      this.http.get<User>(`${Constants.apiUrl}/users`, Constants.options).pipe(
        tap(console.log),
        catchError(Utils.handleError),
        tap((users) => {
          this.setUsers(users);
        })
      )
    );
  }

  private addUserApi(user:any){
    return <Observable<User>>(
      this.http.post(`${Constants.apiUrl}/users`,user,Constants.options).pipe(
        tap(console.log),
        // catchError(this.handleError)
      )
    );
  }

  private updateUserApi(user:any){
    return <Observable<never>>(
      this.http.put(`${Constants.apiUrl}/users`,user,Constants.options).pipe(
        // tap(console.log),
        // catchError(this.handleError)
      )
    );
  }

  private deleteUserApi(id:number) {
    return (
      this.http.delete<void>(`${Constants.apiUrl}/users/${id}`, Constants.options).pipe(
        catchError(Utils.handleError)
      )
    );
  }

}
