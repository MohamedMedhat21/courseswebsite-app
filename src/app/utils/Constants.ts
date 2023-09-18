import { HttpHeaders } from "@angular/common/http";

export class Constants {

  static readonly apiUrl = 'http://localhost:8080/api';

  static readonly jwtToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2hhIiwiaWF0IjoxNjk1MDI5NDAwLCJleHAiOjE2OTUwNDM4MDB9.tyYhEQTLTejnm7t9JCf1O2aXuWHMnadc0OPMARa4nis';

  static readonly coursePageSize=10;

  static readonly options = {
    headers: new HttpHeaders().append(
      'Authorization',
      `Bearer ${this.jwtToken}`
    ),
  };

}