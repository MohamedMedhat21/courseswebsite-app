export interface Course{

  id:number;
  name:string;
  description:string;
  headline:string;
  instructorId:number;
  creationDate:Date;
  creationDateFormatted?:string;
  totalHours:number;
  imagePath:string;
  courseLink:string;
}