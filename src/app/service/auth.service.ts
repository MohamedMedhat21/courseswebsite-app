import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constants } from '../utils/Constants';
import { User } from '../model/user.model';

export interface AuthRes{
  token:string;
  expiresAfterMins:number;
  userId:number;
  roleId:number;
}

export interface UserLogging {
  userId:number;
  username:string;
  token:string;
  expiresAfterMins:number;
  roleId:number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user  = new BehaviorSubject<UserLogging>(null!);
  private tokenExpirationTimer:any;


  constructor(private http:HttpClient,private router:Router) { }

  signup(username:string,password:string,email:string,rolename:string){

    return this.http.post<AuthRes>(`${Constants.apiUrl}/auth/register`,{username,email,password,rolename},Constants.options).pipe(
      map(res=>{
        // this.handleAuthentication(resData);

      const user = {
        userId:res.userId,
        username:username,
        token:res.token,
        expiresAfterMins:res.expiresAfterMins,
        roleId:res.roleId
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

    return this.http.post<AuthRes>(`${Constants.apiUrl}/auth/authenticate`,{username,password},Constants.options).pipe(
      map(res=>{
        // this.handleAuthentication(resData);

      const user = {
        userId:res.userId,
        username:username,
        token:res.token,
        expiresAfterMins:res.expiresAfterMins,
        roleId:res.roleId
      }

      Constants.UserJwtToken = res.token;
      Constants.setOptions(Constants.UserJwtToken);
      localStorage.setItem('userData',JSON.stringify(user));
      console.log(user)
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

    Constants.CurrentUserId = userData.userId
    Constants.UserJwtToken = userData.token;
    Constants.setOptions(Constants.UserJwtToken);
    const user = {
      userId:userData.userId,
      username:userData.email,
      token:userData.token,
      expiresAfterMins:userData.expiresAfterMins,
      roleId:userData.roleId
    }

    this.user.next(user);

  }

  logout(){
    this.user.next(null!);

    localStorage.removeItem('userData');

    window.location.reload()

    // this.router.navigate(['/auth']);


    // if(this.tokenExpirationTimer)
    //   clearTimeout(this.tokenExpirationTimer);


    // this.tokenExpirationTimer=null;

  }

  // autoLogout(expirationDuration:number){
    // TODO refine is needed
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
