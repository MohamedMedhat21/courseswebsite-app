import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { StudentCoursesAPiService } from 'src/app/modules/enrollment/services/student-courses-api.service';
import { StudentCoursesService } from 'src/app/modules/enrollment/services/student-courses.service';

@Injectable({
  providedIn: 'root'
})
export class studentCoursesDataResolverService {

  constructor(private studentCoursesDataService:StudentCoursesService,private studentCoursesAPiService:StudentCoursesAPiService) { }

  async resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const studentCoursesData = this.studentCoursesDataService.getStudentCoursesData();
    if(studentCoursesData.length === 0){
      const currentCourses = await lastValueFrom(this.studentCoursesAPiService.fetchStudentCoursesData());
      this.studentCoursesDataService.setStudentCoursesData(currentCourses);
    }
    return studentCoursesData;
  }
}
