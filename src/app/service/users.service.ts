import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Constants } from '../utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: User[] = [];
  usersChanged = new Subject<User[]>();

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

  addUser(user: User) {
    this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }

  updateUser(index: number, newUser: User) {
    this.users[index] = newUser;
    this.usersChanged.next(this.users.slice());
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
        catchError(this.handleError),
        tap((users) => {
          this.setUsers(users);
        })
      )
    );
  }

  private deleteUserApi(id:number) {
    return (
      this.http.delete<void>(`${Constants.apiUrl}/users/${id}`, Constants.options).pipe(
        catchError(this.handleError)
      )
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(
      () => new Error(`An error occurred, Error code: ${error.status}`)
    );
  }
}
