import { Component, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs';
import { Course } from 'src/app/model/course.model';
import { StudentCoursesData } from 'src/app/model/student-courses-data.model';
import { CoursesService } from 'src/app/service/courses.service';
import { StudentCoursesService } from 'src/app/service/student-courses.service';
import { UsersService } from 'src/app/service/users.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent {
  courseDetails: Course;
  id: number;
  courseVideosNumber: number;
  sanitizedCourseLink: any;
  isUserEnrolled = false;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private studentCoursesService: StudentCoursesService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.courseDetails = this.coursesService.getCourse(this.id);
      this.courseVideosNumber = Math.floor(Math.random() * (100 - 11 + 1) + 11);
      this.sanitizedCourseLink =
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          this.courseDetails.courseLink
        );
      this.isUserEnrolled =
        this.studentCoursesService.getStudentCourseDataByCrsId(
          this.courseDetails.id
        ) === undefined
          ? false
          : true;
    });
  }

  onEnroll(courseId: number) {
    // console.log(this.isUserEnrolled)
    const res = this.studentCoursesService.enrollInCourse(courseId);
    res.subscribe((res) => {
      console.log(res);
      this.isUserEnrolled = true;
      this.studentCoursesService.fetchStudentCoursesData()?.subscribe(res=>{
        console.log(res)
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'you have enrolled, start your learning journey now!',
      });
    });
  }
}
