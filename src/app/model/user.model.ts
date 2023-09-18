export interface User{

  id:number;
  username:string;
  password?:string;
  email:string;
  role:{
    id:number,
    name:string
  };
  enabled:string;
}