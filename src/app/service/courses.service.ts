import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { Course } from '../model/course.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Constants } from '../utils/Constants';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses: Course[] = [];
  coursesChanged = new Subject<Course[]>();

  constructor(
    private http: HttpClient
  ) {}


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
    this.addCourseApi(course).subscribe(course=>{
      course.creationDateFormatted = Utils.formatDate(course.creationDate);
      this.courses.push(course);
      this.coursesChanged.next(this.courses.slice());
    });
  }

  updateCourse(index: number, editedCourse: Course) {
    this.updateCourseApi(editedCourse).subscribe(course=>{
      this.courses[index] = editedCourse;
      this.coursesChanged.next(this.courses.slice());
    });
  }

  deleteCourse(localIndex: number,id:number) {
    this.deleteCourseApi(id).subscribe(course=>{
      this.courses.splice(localIndex, 1);
      this.coursesChanged.next(this.courses.slice());
    })
  }

  private addCourseApi(course:any){
    return <Observable<Course>>(
      this.http.post(`${Constants.apiUrl}/courses`,course,Constants.options).pipe(
        tap(console.log),
        // catchError(this.handleError)
      )
    );
  }

  private updateCourseApi(course:any){
    return <Observable<Course>>(
      this.http.put(`${Constants.apiUrl}/courses`,course,Constants.options).pipe(
        tap(console.log),
        // catchError(this.handleError)
      )
    );
  }

  private deleteCourseApi(id:number){
    return <Observable<Course>>(
      this.http.delete(`${Constants.apiUrl}/courses/${id}`,Constants.options).pipe(
        // tap(console.log),
        // catchError(this.handleError)
      )
    );
  }

  fetchCourses() {
    return <Observable<Course[]>>(
      this.http
        .get<Course>(`${Constants.apiUrl}/courses?p=0&s=id`, Constants.options)
        .pipe(
          tap(console.log),
          map((courses) => {
            courses.forEach((course: Course) => {
              course.creationDateFormatted = Utils.formatDate(course.creationDate)
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
