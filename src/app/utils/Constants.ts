import { HttpHeaders } from "@angular/common/http";

export class Constants {

  static readonly apiUrl = 'http://localhost:8080/api';

  static readonly jwtToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2hhIiwiaWF0IjoxNjk1MDQ0ODY4LCJleHAiOjE2OTUwNjI4Njh9.z3gCvK3jGNCKgMhzi96n-SAJUE3nloax8xblFhC3juI';

  static readonly coursePageSize=10;

  static readonly options = {
    headers: new HttpHeaders().append(
      'Authorization',
      `Bearer ${this.jwtToken}`
    ),
  };

}