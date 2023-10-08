import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { Course } from '../model/course.model';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../utils/Constants';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class CoursesApiService {

  constructor(private http: HttpClient) {}

  addCourseApi(course: any) {
    return <Observable<Course>>(
      this.http
        .post(`${Constants.apiUrl}/users/${Constants.CurrentLoggedUser.id}/mycourses`, course)
        .pipe(
          tap(console.log),
          catchError(Utils.handleError),
        )
    );
  }

  updateCourseApi(course: any) {
    return <Observable<Course>>(
      this.http
        .put(
          `${Constants.apiUrl}/users/${Constants.CurrentLoggedUser.id}/mycourses`,
          course
        )
        .pipe(
          tap(console.log),
          catchError(Utils.handleError)
          )
    );
  }

  deleteCourseApi(courseId: number) {
    return <Observable<Course>>this.http
      .delete(
        `${Constants.apiUrl}/users/${Constants.CurrentLoggedUser.id}/mycourses/${courseId}`
      )
      .pipe(
      tap(console.log),
      catchError(Utils.handleError)
      );
  }

  fetchCourses() {
    return <Observable<Course[]>>(
      this.http
        .get<Course>(`${Constants.apiUrl}/courses?pageNumber=0&pageSize=10&sortField=id`)
        .pipe(
          tap(console.log),
          map((res) => {
            res.courses.forEach((course: Course) => {
              course.creationDateFormatted = Utils.formatDate(course.creationDate);
            });
            return res.courses;
          }),
          catchError(Utils.handleError)
        )
    );
  }
}
