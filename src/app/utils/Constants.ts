import { HttpHeaders } from "@angular/common/http";

export class Constants {

  static readonly apiUrl = 'http://localhost:8080/api';

  static readonly AdminJwtToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2hhIiwiaWF0IjoxNjk1MjEzNDExLCJleHAiOjE2OTUyMzUwMTF9.2MUhaXIVZrLm5OoVVF9-mojNaJruIhKdjP1rk8XXPXk';

  static readonly InstructorJwtToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2hhIiwiaWF0IjoxNjk1MTk1MDAzLCJleHAiOjE2OTUyMTY2MDN9.fQuEy3yVYrDPqEoCnmtGftx-ejO7O1vvb-dtPKoPP48';

  static readonly coursePageSize=10;

  static readonly options = {
    headers: new HttpHeaders().append(
      'Authorization',
      `Bearer ${this.AdminJwtToken}`
    ),
  };

}