import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constants } from '../utils/Constants';

export interface authRes{
  token:string;
  expiresAfterMins:number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user  = new BehaviorSubject<any>(null!);
  private tokenExpirationTimer:any;


  constructor(private http:HttpClient,private router:Router) { }

  signup(username:string,password:string,email:string,rolename:string){

    return this.http.post<authRes>(`${Constants.apiUrl}/auth/register`,{username,email,password,rolename},Constants.options).pipe(
      map(res=>{
        // this.handleAuthentication(resData);

      const user = {
        username:username,
        email:email,
        token:res.token,
        expiresAfterMins:res.expiresAfterMins
      }

      Constants.UserJwtToken = res.token;
      Constants.setOptions(Constants.UserJwtToken);
      localStorage.setItem('userData',JSON.stringify(user));
      this.user.next(user);

      console.log(Constants.UserJwtToken);

      // this.autoLogout(user.expiresAfterMins * 1000);

    })
    );
  }


  login(username:string,password:string){

    return this.http.post<authRes>(`${Constants.apiUrl}/auth/authenticate`,{username,password},Constants.options).pipe(
      map(res=>{
        // this.handleAuthentication(resData);

      const user = {
        username:username,
        token:res.token,
        expiresAfterMins:res.expiresAfterMins
      }

      console.log('hell')
      Constants.UserJwtToken = res.token;
      Constants.setOptions(Constants.UserJwtToken);
      localStorage.setItem('userData',JSON.stringify(user));
      this.user.next(user);

      console.log(Constants.UserJwtToken);

      // this.autoLogout(user.expiresAfterMins * 1000);

    })
    );
  }

  autoLogin(){

    const userData = JSON.parse(localStorage.getItem('userData')!);

    if(!userData){
      return;
    }

    Constants.UserJwtToken = userData.token;
    Constants.setOptions(Constants.UserJwtToken);

  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);

    localStorage.removeItem('userData');

    if(this.tokenExpirationTimer)
      clearTimeout(this.tokenExpirationTimer);


    this.tokenExpirationTimer=null;

    window.location.reload
  }

  // autoLogout(expirationDuration:number){

  //   this.tokenExpirationTimer = setTimeout(() => {
  //     this.logout();
  //   }, expirationDuration);

  // }


  private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

      // const user = new User(email,userId,token,expirationDate);

      // this.user.next(user);

      // localStorage.setItem('userData',JSON.stringify(user));

      // this.autoLogout(expiresIn * 1000);
  }
}
