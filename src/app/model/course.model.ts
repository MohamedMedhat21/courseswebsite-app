export interface Course{

  id:number;
  name:string;
  description:string;
  instructorId:number;
  creationDate:Date;
  creationDateFormatted?:string;
}