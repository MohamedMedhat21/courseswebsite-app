import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CoursesService } from 'src/app/service/courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesResolverService {

  constructor(private coursesService:CoursesService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const courses = this.coursesService.getCourses();
    if(courses.length === 0){
      return this.coursesService.fetchCourses();
    }
    return courses;
  }
}
