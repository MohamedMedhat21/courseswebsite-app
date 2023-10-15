import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CoursesApiService } from 'src/app/modules/courses/services/courses-api.service';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesResolverService {

  constructor(private coursesService:CoursesService,private coursesApiService:CoursesApiService) { }

  async resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const courses = this.coursesService.getCourses();
    if(courses.length === 0){
      const currentCourses = await lastValueFrom(this.coursesApiService.fetchCourses());
      this.coursesService.setCourses(currentCourses);
      
    }
    return courses;
  }
}
