export interface Course{

  id:number;
  name:string;
  description:string;
  headline:string;
  instructorId:number;
  creationDate:Date;
  totalHours:number;
  imagePath:string;
  creationDateFormatted?:string;
}