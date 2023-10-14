import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CoursesService } from 'src/app/service/courses.service';
import { Constants } from '../utils/Constants';
import { CoursesApiService } from '../service/courses-api.service';
import { lastValueFrom } from 'rxjs';

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

      // return .subscribe(crs=>{
      // });
    }
    return courses;
  }
}
