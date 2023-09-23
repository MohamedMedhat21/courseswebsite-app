export interface Course{

  id:number;
  name:string;
  description:string;
  headline:string;
  instructorId:number;
  instructorName?:string;
  creationDate:Date;
  creationDateFormatted?:string;
  totalHours:number;
  imagePath:string;
  courseLink:string;
}