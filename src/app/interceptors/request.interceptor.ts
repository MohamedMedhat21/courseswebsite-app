import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../utils/Constants';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('http://localhost:8080/api/courses?')) {
      return next.handle(request);
    }
    if (request.url.includes('http://localhost:8080/api/auth')) {
      if (!request.url.includes('http://localhost:8080/api/auth/logout'))
        return next.handle(request);
    }

    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${Constants.CurrentLoggedUser.jwtToken}`,
      },
    });
    // this.authService.checkToken('',Constants.CurrentLoggedUser).subscribe();
    return next.handle(modifiedRequest);
  }
}
