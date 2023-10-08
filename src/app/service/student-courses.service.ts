import { Injectable } from '@angular/core';
import { StudentCoursesData } from '../model/student-courses-data.model';
import { Subject } from 'rxjs';
import { StudentCoursesAPiService } from './student-courses-api.service';

@Injectable({
  providedIn: 'root'
})
export class StudentCoursesService {

  private studentCoursesData: StudentCoursesData[] = [];
  studentCoursesDataChanged = new Subject<StudentCoursesData[]>();

  constructor(private studentCoursesAPiService:StudentCoursesAPiService) {
  }

  setStudentCoursesData(studentCoursesData: StudentCoursesData[]) {
    this.studentCoursesData = studentCoursesData;
    this.studentCoursesDataChanged.next(this.studentCoursesData.slice());
  }

  addStudentCourseData(studentCourseData:StudentCoursesData){
    this.studentCoursesData.push(studentCourseData);
    this.studentCoursesDataChanged.next(this.studentCoursesData.slice());
  }

  getStudentCoursesData() {
    return this.studentCoursesData.slice();
  }

  getStudentCourseData(index: number) {
    return this.studentCoursesData[index];
  }

  getStudentCourseDataByCrsId(courseId: number) {
    return this.studentCoursesData.filter(crs =>{
      return crs.courseId === courseId
    })[0];
  }

  enrollInCourse(courseId:number){
    return this.studentCoursesAPiService.enrollInCourseApi(courseId)
  }

  unenroll(localIndex:number,courseId:number,userId:number){
    this.studentCoursesAPiService.unenrollCourseApi(userId,courseId).subscribe((res) => {
      if(res.status === 204){
        window.location.reload()
      }
    });
  }

}
