import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StudentCoursesDataService } from '../service/student-courses-data.service';

@Injectable({
  providedIn: 'root'
})
export class studentCoursesDataResolverService {

  constructor(private studentCoursesDataService:StudentCoursesDataService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const studentCoursesData = this.studentCoursesDataService.getStudentCoursesData();
    if(studentCoursesData.length === 0){
      return this.studentCoursesDataService.fetchStudentCoursesData();
    }
    return studentCoursesData;
  }
}
