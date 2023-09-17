import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Course } from '../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses: Course[] = [];
  coursesChanged = new Subject<Course[]>();


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
    this.courses.push(course);
    this.coursesChanged.next(this.courses.slice());
  }

  updateCourse(index: number, newCourse: Course) {
    this.courses[index] = newCourse;
    this.coursesChanged.next(this.courses.slice());
  }

  deleteCourse(index: number) {
    this.courses.splice(index, 1);
    this.coursesChanged.next(this.courses.slice());
  }
}
