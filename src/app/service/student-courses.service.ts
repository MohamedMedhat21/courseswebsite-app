import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentCoursesData } from '../model/student-courses-data.model';
import { Observable, Subject, catchError, map, tap } from 'rxjs';
import { Constants } from '../utils/Constants';
import { Utils } from '../utils/utils';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentCoursesService {
  isAuthenticated=false;

  private studentCoursesData: StudentCoursesData[] = [];
  studentCoursesDataChanged = new Subject<StudentCoursesData[]>();

  constructor(private http: HttpClient,private authService:AuthService) {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true; // or you can use !!user
    });
    // console.log(Constants.CurrentUserId)
    this.isAuthenticated = Constants.CurrentLoggedUser.id === 0 ? false:true;
    // console.log(this.isAuthenticated)
  }

  setStudentCoursesData(studentCoursesData: StudentCoursesData[]) {
    this.studentCoursesData = studentCoursesData;
    this.studentCoursesDataChanged.next(this.studentCoursesData.slice());
  }

  getStudentCoursesData() {
    return this.studentCoursesData.slice();
  }

  // getStudentCourseData(index: number) {
  //   return this.studentCoursesData[index];
  // }

  getStudentCourseData(courseId: number) {
    return this.studentCoursesData.filter(crs =>{
      return crs.courseId === courseId
    });
  }

  enrollInCourse(courseId:number){
    let isSuccess=false;
    this.enrollInCourseApi(courseId).subscribe((res) => {
      console.log(res)
      isSuccess = true;
    },
    err=>{
      console.log(err)
    }
    );
    return isSuccess;
  }

  unenroll(localIndex:number,courseId:number,userId:number){
    this.unenrollCourseApi(userId,courseId).subscribe((res) => {
      if(res.status === 204){
        window.location.reload()
      }
    });
  }

  fetchStudentCoursesData() {
    if(!this.isAuthenticated){
      return
    }
    if(Constants.CurrentLoggedUser.roleId!==3)
      return
    return <Observable<StudentCoursesData[]>>(
      this.http
        .get<StudentCoursesData>(`${Constants.apiUrl}/users/${Constants.CurrentLoggedUser.id}/enrollments`, Constants.options)
        .pipe(
          tap(console.log),
          map((studentCoursesData) => {
            studentCoursesData.forEach((studentCourse: StudentCoursesData) => {
              studentCourse.enrollmentDateFormatted = Utils.formatDate(studentCourse.enrollmentDate)
            });
            return studentCoursesData;
          }),
          // catchError(this.handleError),
          tap((studentCoursesData) => {
            this.setStudentCoursesData(studentCoursesData);
          })
        )
    );
  }

  private enrollInCourseApi(courseId:number){
    return (
      this.http.post(`${Constants.apiUrl}/users/${Constants.CurrentLoggedUser.id}/enrollments`,{courseId},{headers:Constants.options.headers,observe : 'response'})
    );
  }

  private unenrollCourseApi(userId:number,courseId:number){
    return (
      this.http.delete(`${Constants.apiUrl}/users/${userId}/enrollments/${courseId}`, {headers:Constants.options.headers,observe : 'response'})
      );
  }

}
