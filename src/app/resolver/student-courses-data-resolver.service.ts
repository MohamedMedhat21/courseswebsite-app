import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StudentCoursesService } from '../service/student-courses.service';
import { StudentCoursesAPiService } from '../service/student-courses-api.service';

@Injectable({
  providedIn: 'root'
})
export class studentCoursesDataResolverService {

  constructor(private studentCoursesDataService:StudentCoursesService,private studentCoursesAPiService:StudentCoursesAPiService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const studentCoursesData = this.studentCoursesDataService.getStudentCoursesData();
    if(studentCoursesData.length === 0){
      return this.studentCoursesAPiService.fetchStudentCoursesData()?.subscribe(stCrs=>{
        this.studentCoursesDataService.setStudentCoursesData(stCrs);
      });
    }
    return studentCoursesData;
  }
}
