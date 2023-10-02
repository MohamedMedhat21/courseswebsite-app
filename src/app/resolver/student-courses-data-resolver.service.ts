import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StudentCoursesService } from '../service/student-courses.service';

@Injectable({
  providedIn: 'root'
})
export class studentCoursesDataResolverService {

  constructor(private studentCoursesDataService:StudentCoursesService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const studentCoursesData = this.studentCoursesDataService.getStudentCoursesData();
    if(studentCoursesData.length === 0){
      return this.studentCoursesDataService.fetchStudentCoursesData();
    }
    return studentCoursesData;
  }
}
