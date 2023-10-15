import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { Constants } from 'src/app/core/utils/Constants';
import { Utils } from 'src/app/core/utils/utils';
import { AuthService } from '../../auth/services/auth.service';
import { StudentCoursesData } from '../models/student-courses-data.model';
import { UserRoles } from 'src/app/core/enums/user-roles.enum';

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

    if(Constants.CurrentLoggedUser.roleId!==UserRoles.STUDENT)
      return of([]);

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
