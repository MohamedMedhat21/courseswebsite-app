import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CoursesService } from 'src/app/service/courses.service';

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
