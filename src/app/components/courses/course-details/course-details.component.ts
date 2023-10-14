import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Local } from 'src/app/interface/local.interface';
import { Course } from 'src/app/model/course.model';
import { CoursesService } from 'src/app/service/courses.service';
import { StudentCoursesAPiService } from 'src/app/service/student-courses-api.service';
import { StudentCoursesService } from 'src/app/service/student-courses.service';
import { Constants } from 'src/app/utils/Constants';

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
  currLang = this.translateService.currentLang as keyof Local;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private studentCoursesService: StudentCoursesService,
    private studentCoursesApiService: StudentCoursesAPiService,
    private messageService: MessageService,
    public translateService:TranslateService
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

    this.translateService.onLangChange.subscribe(()=>{
      this.currLang = this.translateService.currentLang as keyof Local;
    })
  }

  onEnroll(courseId: number) {
    const isAuthenticated = Constants.CurrentLoggedUser.id === 0 ? false : true;
    if(!isAuthenticated){
      this.router.navigate(['/auth']);
      return;
    }
    const res = this.studentCoursesService.enrollInCourse(courseId);
    res.subscribe((res) => {
      console.log(res);
      this.isUserEnrolled = true;
      this.studentCoursesApiService.fetchStudentCoursesData()?.subscribe(res=>{
        this.studentCoursesService.setStudentCoursesData(res);
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'you have enrolled, start your learning journey now!',
      });
    });
  }
}
