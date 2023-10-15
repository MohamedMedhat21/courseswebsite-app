export interface CurrentUser{
  id:number;
  username:string;
  jwtToken:string;
  expiresAfterMins:number;
  roleId:number;
}