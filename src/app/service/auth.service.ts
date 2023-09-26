import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants, CurrentUser } from '../utils/Constants';

export interface AuthRes{
  userId:number;
  token:string;
  expiresAfter:number;
  roleId:number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user  = new BehaviorSubject<CurrentUser>(null!);

  private tokenExpirationTimer:any;


  constructor(private http:HttpClient,private router:Router) { }

  signup(username:string,password:string,email:string,rolename:string){

    return this.http.post<AuthRes>(`${Constants.apiUrl}/auth/register`,{username,email,password,rolename},Constants.options).pipe(
      map(res=>{
        // this.handleAuthentication(resData);

      Constants.CurrentLoggedUser={
        id:res.userId,
        username:username,
        jwtToken:res.token,
        expiresAfterMins:res.expiresAfter,
        roleId:res.roleId
      }

      Constants.setOptions(res.token);

      localStorage.setItem('userData',JSON.stringify(Constants.CurrentLoggedUser));
      this.user.next(Constants.CurrentLoggedUser);

      console.log(Constants.CurrentLoggedUser);

      // this.autoLogout(user.expiresAfterMins * 1000);
    })
    );
  }


  login(username:string,password:string){

    return this.http.post<AuthRes>(`${Constants.apiUrl}/auth/authenticate`,{username,password},Constants.options).pipe(
      map(res =>{
        // this.handleAuthentication(resData);

        Constants.CurrentLoggedUser={
          id:res.userId,
          username:username,
          jwtToken:res.token,
          expiresAfterMins:res.expiresAfter,
          roleId:res.roleId
        }

        Constants.setOptions(res.token);

      localStorage.setItem('userData',JSON.stringify(Constants.CurrentLoggedUser));
      console.log(Constants.CurrentLoggedUser)
      this.user.next(Constants.CurrentLoggedUser);

      // this.autoLogout(user.expiresAfterMins * 1000);
    })
    );
  }

  autoLogin(){

    const userData:CurrentUser = JSON.parse(localStorage.getItem('userData')!);

    if(!userData){
      return;
    }

    Constants.CurrentLoggedUser={
      id:userData.id,
      username:userData.username,
      jwtToken:userData.jwtToken,
      expiresAfterMins:userData.expiresAfterMins,
      roleId:userData.roleId
    }

    Constants.setOptions(userData.jwtToken);

    this.user.next(Constants.CurrentLoggedUser);

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
