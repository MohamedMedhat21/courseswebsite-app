import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CoursesApiService } from './courses-api.service';
import { Constants } from 'src/app/core/utils/Constants';
import { Utils } from 'src/app/core/utils/utils';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Course[] = [];
  coursesChanged = new Subject<Course[]>();

  constructor(private coursesApiService:CoursesApiService) {}

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

  getCourseByCourseId(courseId: number) {
    return this.courses.filter(crs =>{
      return crs.id === courseId
    })[0];
  }

  addCourse(coursee: Course) {
    this.coursesApiService.addCourseApi(coursee).subscribe((course) => {
      course.creationDateFormatted = Utils.formatDate(course.creationDate);
      course.instructorName = Constants.CurrentLoggedUser.username
      course.courseName={
        en:coursee.courseName.en,
        ar:coursee.courseName.ar
      }
      this.courses.push(course);
      this.coursesChanged.next(this.courses.slice());
    });
  }

  updateCourse(index: number, editedCourse: Course) {
    this.coursesApiService.updateCourseApi(editedCourse).subscribe((course) => {
      let localIndex = 0;
      this.courses.forEach((crs, index) => {
        if (crs.id === editedCourse.id) {
          localIndex = index;
        }
      });
      course.creationDateFormatted = Utils.formatDate(course.creationDate);
      this.courses[localIndex] = editedCourse;
      this.coursesChanged.next(this.courses.slice());
    });
  }

  deleteCourse(id: number) {
    this.coursesApiService.deleteCourseApi(id).subscribe((course) => {
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

}
