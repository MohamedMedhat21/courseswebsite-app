import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentCoursesData } from '../model/student-courses-data.model';
import { Observable, catchError, map, tap } from 'rxjs';
import { Constants } from '../utils/Constants';
import { Utils } from '../utils/utils';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentCoursesAPiService {
  isAuthenticated=false;

  constructor(private http: HttpClient,private authService:AuthService) {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true; // or you can use !!user
    });
    this.isAuthenticated = Constants.CurrentLoggedUser.id === 0 ? false:true;
  }

  fetchStudentCoursesData() {
    if(!this.isAuthenticated){
      return
    }
    if(Constants.CurrentLoggedUser.roleId!==3)
      return

    return <Observable<StudentCoursesData[]>>(
      this.http
        .get<StudentCoursesData>(`${Constants.apiUrl}/users/${Constants.CurrentLoggedUser.id}/enrollments`)
        .pipe(
          tap(console.log),
          map((studentCoursesData) => {
            studentCoursesData.forEach((studentCourse: StudentCoursesData) => {
              studentCourse.enrollmentDateFormatted = Utils.formatDate(studentCourse.enrollmentDate)
            });
            return studentCoursesData;
          }),
          catchError(Utils.handleError)
        )
    );
  }

  enrollInCourseApi(courseId:number){
    return (
      this.http.post(`${Constants.apiUrl}/users/${Constants.CurrentLoggedUser.id}/enrollments`,{courseId},{observe : 'response'})
      .pipe(catchError(Utils.handleError))
    );
  }

  unenrollCourseApi(userId:number,courseId:number){
    return (
      this.http.delete(`${Constants.apiUrl}/users/${userId}/enrollments/${courseId}`, {observe : 'response'})
      .pipe(catchError(Utils.handleError))
      );
  }

}
