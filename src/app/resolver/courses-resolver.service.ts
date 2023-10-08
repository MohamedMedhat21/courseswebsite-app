import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CoursesService } from 'src/app/service/courses.service';
import { Constants } from '../utils/Constants';
import { CoursesApiService } from '../service/courses-api.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesResolverService {

  constructor(private coursesService:CoursesService,private coursesApiService:CoursesApiService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const courses = this.coursesService.getCourses();
    if(courses.length === 0){
      return this.coursesApiService.fetchCourses().subscribe(crs=>{
        this.coursesService.setCourses(crs);
      });
    }
    return courses;
  }
}
