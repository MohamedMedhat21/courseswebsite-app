import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Constants } from '../utils/Constants';
import { Utils } from '../utils/utils';

@Injectable()
export class TokenCheckInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('checkToken')||request.url.includes('http://localhost:8080/api/courses?')
    ||request.url.includes('http://localhost:8080/api/auth')){
      return next.handle(request);
    }
    console.log('from interceptor');
    // console.log(request);
    this.authService.checkToken('',Constants.CurrentLoggedUser).subscribe();
    // console.log('----------------------------');

    return next.handle(request);
  }
}
