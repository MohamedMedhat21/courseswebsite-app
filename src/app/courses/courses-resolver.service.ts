import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../service/api.service';
import { CoursesService } from '../service/courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesResolverService {

  constructor(private apiService:ApiService,private coursesService:CoursesService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const courses = this.coursesService.getCourses();
    if(courses.length === 0){
      return this.apiService.fetchCourses();
    }
    return courses;
  }
}
