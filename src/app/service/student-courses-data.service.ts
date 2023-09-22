import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentCoursesData } from '../model/student-courses-data.model';
import { Observable, Subject, map, tap } from 'rxjs';
import { Constants } from '../utils/Constants';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class StudentCoursesDataService {
  userId=6; // TODO take user id from the current logged in user id

  private studentCoursesData: StudentCoursesData[] = [];
  studentCoursesDataChanged = new Subject<StudentCoursesData[]>();

  constructor(private http: HttpClient) { }

  setStudentCoursesData(studentCoursesData: StudentCoursesData[]) {
    this.studentCoursesData = studentCoursesData;
    this.studentCoursesDataChanged.next(this.studentCoursesData.slice());
  }

  getStudentCoursesData() {
    return this.studentCoursesData.slice();
  }

  getStudentCourseData(index: number) {
    return this.studentCoursesData[index];
  }

  unenroll(localIndex:number,id:number){

  }

  fetchStudentCoursesData() {
    return <Observable<StudentCoursesData[]>>(
      this.http
        .get<StudentCoursesData>(`${Constants.apiUrl}/users/${this.userId}/enrollments`, Constants.options)
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

}
