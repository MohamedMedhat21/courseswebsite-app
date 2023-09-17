import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError, map } from 'rxjs';
import { Course } from '../model/course.model';
import { Constants } from '../utils/Constants';
import { CoursesService } from './courses.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private readonly options = {
    headers: new HttpHeaders().append('Authorization', `Bearer ${Constants.jwtToken}`)
  }

  constructor(private http:HttpClient,private coursesService:CoursesService) { }

  fetchCourses(){
    return <Observable<Course[]>>
    this.http.get<Course>(`${Constants.apiUrl}/courses?p=0&s=id`,this.options)
      .pipe(
        tap(console.log),
        map(courses =>{
          const currDate = new Date()
          courses.forEach((course: Course) => {
            const creationDate = new Date(course.creationDate);
            course.creationDateFormatted = Math.ceil((currDate.getTime() - creationDate.getTime()) / (1000 * 3600 * 24)) + ' days ago';
          });
          return courses
        }),
        catchError(this.handleError),
        tap(courses =>{
          this.coursesService.setCourses(courses);
        })
      );
  }

  handleError(error:HttpErrorResponse):Observable<never>{
    console.log(error);
    return throwError(() => new Error(`An error occurred, Error code: ${error.status}`));
  }

}
