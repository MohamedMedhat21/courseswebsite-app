import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { Course } from '../model/course.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Constants } from '../utils/Constants';
import { Utils } from '../utils/utils';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Course[] = [];
  coursesChanged = new Subject<Course[]>();

  constructor(private http: HttpClient, private usersService: UsersService) {}

  setCourses(courses: Course[]) {
    this.courses = courses;
    this.coursesChanged.next(this.courses.slice());
  }

  getCourses() {
    return this.courses.slice();
  }

  getCourse(index: number) {
    return this.courses[index];
  }

  addCourse(course: Course) {
    this.addCourseApi(course).subscribe((course) => {
      course.creationDateFormatted = Utils.formatDate(course.creationDate);
      course.instructorName = Constants.CurrentLoggedUser.username
      this.courses.push(course);
      this.coursesChanged.next(this.courses.slice());
    });
  }

  updateCourse(index: number, editedCourse: Course) {
    this.updateCourseApi(editedCourse).subscribe((course) => {
      let localIndex = 0;
      this.courses.forEach((crs, index) => {
        if (crs.id === editedCourse.id) {
          localIndex = index;
        }
      });
      this.courses[localIndex] = editedCourse;
      this.coursesChanged.next(this.courses.slice());
    });
  }

  deleteCourse(id: number) {
    this.deleteCourseApi(id).subscribe((course) => {
      let localIndex = 0;
      this.courses.forEach((crs, index) => {
        if (crs.id === id) {
          localIndex = index;
        }
      });
      this.courses.splice(localIndex, 1);
      this.coursesChanged.next(this.courses.slice());
    });
  }

  private addCourseApi(course: any) {
    return <Observable<Course>>(
      this.http
        .post(`${Constants.apiUrl}/users/${Constants.CurrentLoggedUser.id}/mycourses`, course, Constants.options)
        .pipe(
          tap(console.log)
          // catchError(this.handleError),
        )
    );
  }

  private updateCourseApi(course: any) {
    return <Observable<Course>>(
      this.http
        .put(
          `${Constants.apiUrl}/users/${Constants.CurrentLoggedUser.id}/mycourses`,
          course,
          Constants.options
        )
        .pipe(tap(console.log))
    );
  }

  private deleteCourseApi(courseId: number) {
    return <Observable<Course>>this.http
      .delete(
        `${Constants.apiUrl}/users/${Constants.CurrentLoggedUser.id}/mycourses/${courseId}`,
        Constants.options
      )
      .pipe
      // tap(console.log),
      // catchError(this.handleError)
      ();
  }

  fetchCourses() {
    return <Observable<Course[]>>(
      this.http
        .get<Course>(`${Constants.apiUrl}/courses?p=0&s=id`, Constants.options)
        .pipe(
          tap(console.log),
          map((courses) => {
            courses.forEach((course: Course) => {
              course.creationDateFormatted = Utils.formatDate(
                course.creationDate
              );
            });
            return courses;
          }),
          catchError(Utils.handleError),
          tap((courses) => {
            this.setCourses(courses);
          })
        )
    );
  }
}
