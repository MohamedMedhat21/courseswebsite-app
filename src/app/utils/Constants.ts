import { HttpHeaders } from "@angular/common/http";

export class Constants {

  static readonly apiUrl = 'http://localhost:8080/api';

  static readonly jwtToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2hhIiwiaWF0IjoxNjk1MTIzMDU0LCJleHAiOjE2OTUxNDQ2NTR9.DH9Q2NcvZznEDJO9ELkGKnwC_s6SF4JfYTMarGJJFbk';

  static readonly coursePageSize=10;

  static readonly options = {
    headers: new HttpHeaders().append(
      'Authorization',
      `Bearer ${this.jwtToken}`
    ),
  };

}