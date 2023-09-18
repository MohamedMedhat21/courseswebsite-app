export interface User{

  id:number;
  username:string;
  email:string;
  role:{
    id:number,
    name:string
  };
  enabled:string;
}