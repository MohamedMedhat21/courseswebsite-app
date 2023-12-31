import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Constants } from 'src/app/core/utils/Constants';
import { Utils } from 'src/app/core/utils/utils';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private http: HttpClient){

  }

  fetchUsers() {
    return <Observable<User[]>>(
      this.http.get<User>(`${Constants.apiUrl}/users`).pipe(
        tap(console.log),
        catchError(Utils.handleError)
      )
    );
  }

  fetchUser(userId:number) {
    return <Observable<User>>(
      this.http.get<User>(`${Constants.apiUrl}/users/${userId}`).pipe(
        tap(console.log),
        catchError(Utils.handleError)
      )
    );
  }


  addUserApi(user:any){
    return <Observable<User>>(
      this.http.post(`${Constants.apiUrl}/users`,user).pipe(
        tap(console.log),
        catchError(Utils.handleError)
      )
    );
  }

  updateUserApi(user:any){
    return <Observable<never>>(
      this.http.put(`${Constants.apiUrl}/users`,user).pipe(
        tap(console.log),
        catchError(Utils.handleError)
      )
    );
  }

  deleteUserApi(id:number) {
    return (
      this.http.delete<void>(`${Constants.apiUrl}/users/${id}`).pipe(
        catchError(Utils.handleError)
      )
    );
  }

  downloadFileApi() {

    this.http.get(`${Constants.apiUrl}/users/exportAll`, {
      responseType: 'blob', // 'blob' for handling binary data
    }).pipe(catchError(Utils.handleError))
    .subscribe((response: Blob) => {
      const filename = 'users.pdf';

      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(response);
      link.download = filename;

      // Simulate a click on the anchor element to trigger the download
      link.click();

      // Clean up the temporary anchor element
      link.remove();
    });
  }

}

