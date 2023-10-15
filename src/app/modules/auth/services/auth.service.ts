import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { CurrentUser } from 'src/app/core/interface/current-user.interface';
import { Constants } from 'src/app/core/utils/Constants';
import { Utils } from 'src/app/core/utils/utils';

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
    const enabled = 1;
    return this.http.post<AuthRes>(`${Constants.apiUrl}/auth/register`,{username,email,password,enabled,rolename}).pipe(
      map(res=>{
        // this.handleAuthentication(resData);

      Constants.CurrentLoggedUser={
        id:res.userId,
        username:username,
        jwtToken:res.token,
        expiresAfterMins:res.expiresAfter,
        roleId:res.roleId
      }

      // Constants.setOptions(res.token);

      localStorage.setItem('userData',JSON.stringify(Constants.CurrentLoggedUser));
      this.user.next(Constants.CurrentLoggedUser);

      console.log(Constants.CurrentLoggedUser);

      // this.autoLogout(user.expiresAfterMins * 1000);
    }),
    catchError(Utils.handleError)
    );
  }


  login(username:string,password:string){

    return this.http.post<AuthRes>(`${Constants.apiUrl}/auth/authenticate`,{username,password}).pipe(
      map(res =>{
        // this.handleAuthentication(resData);

        Constants.CurrentLoggedUser={
          id:res.userId,
          username:username,
          jwtToken:res.token,
          expiresAfterMins:res.expiresAfter,
          roleId:res.roleId
        }

        // Constants.setOptions(res.token);

      localStorage.setItem('userData',JSON.stringify(Constants.CurrentLoggedUser));
      console.log(Constants.CurrentLoggedUser)
      this.user.next(Constants.CurrentLoggedUser);

      // this.autoLogout(user.expiresAfterMins * 1000);
    }),
    catchError(Utils.handleError),
    );
  }

  autoLogin(){

    const userData:CurrentUser = JSON.parse(localStorage.getItem('userData')!);

    if(!userData){
      return;
    }

    const tokenExpirationDate = Utils.getJwtTokenExpirationDate(userData.jwtToken);
    const nowDate = new Date();
    const diffTime =  nowDate.getTime() - tokenExpirationDate.getTime()
    // const diffHours = Math.floor(diffTime / (1000 * 60 * 60))

    if(diffTime > 0){
      this.logout().subscribe()
      return;
    }

    Constants.CurrentLoggedUser={
      id:userData.id,
      username:userData.username,
      jwtToken:userData.jwtToken,
      expiresAfterMins:userData.expiresAfterMins,
      roleId:userData.roleId
    }

    this.user.next(Constants.CurrentLoggedUser);

    // this.checkToken('',userData).subscribe();
  }

  checkToken(token:string,userData:CurrentUser){
    Constants.CurrentLoggedUser.jwtToken = userData.jwtToken;
    token = userData.jwtToken;
    // Constants.setOptions(token);
    return this.http.post<Token>(`${Constants.apiUrl}/auth/checkToken`,{token}).pipe(
      tap(console.log),
      map(userToken =>{
        if(!userToken.revoked && !userToken.expired){
          Constants.CurrentLoggedUser={
            id:userData.id,
            username:userData.username,
            jwtToken:userData.jwtToken,
            expiresAfterMins:userData.expiresAfterMins,
            roleId:userData.roleId
          }
          // Constants.setOptions(userData.jwtToken);

          this.user.next(Constants.CurrentLoggedUser);

        }
    }),
    catchError(Utils.handleError),
    );
  }

  logout(){
    return this.http.get(`${Constants.apiUrl}/auth/logout`).pipe(
      map(res =>{

        Constants.CurrentLoggedUser={
          id:0,
          username:'',
          jwtToken:'',
          expiresAfterMins:0,
          roleId:0
        }

        this.user.next(null!);

        localStorage.removeItem('userData');

        this.router.navigate(['/auth']);

        setTimeout(() => {
          window.location.reload()
        }, 500);


        // if(this.tokenExpirationTimer)
        //   clearTimeout(this.tokenExpirationTimer);


        // this.tokenExpirationTimer=null;

    }),
    catchError(Utils.handleError),
    );


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
