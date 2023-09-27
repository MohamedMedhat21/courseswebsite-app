import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import jwt_decode, { JwtPayload } from 'jwt-decode'

export class Utils {

  static readonly currDate = new Date();

  static formatDate(date:Date){
    const creationDate = new Date(date);
    const days = Math.ceil((this.currDate.getTime() - creationDate.getTime()) / (1000 * 3600 * 24));
    if(days < 1)
      return 'Today'
    return days + ' days ago';
  }

  static handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(
      () => new Error(`An error occurred, Error code: ${error.status}`)
    );
  }

  static getJwtTokenExpirationDate(token: string): Date {
    const decodedToken = jwt_decode<JwtPayload>(token);
    const expirationDate = new Date(0); // Start with the Unix epoch
    expirationDate.setUTCSeconds(decodedToken.exp!); // Set the expiration date using the `exp` claim
    return expirationDate;
  }

}