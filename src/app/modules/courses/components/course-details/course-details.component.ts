import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Local } from 'src/app/core/interface/local.interface';
import { Constants } from 'src/app/core/utils/Constants';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { StudentCoursesService } from 'src/app/modules/enrollment/services/student-courses.service';
import { StudentCoursesAPiService } from 'src/app/modules/enrollment/services/student-courses-api.service';
import { RouterPaths } from 'src/app/core/enums/router-paths.enum';


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
      const crs = this.coursesService.getCourse(this.id);
      if(!crs){
        this.router.navigate(['/'+RouterPaths.NOT_FOUND]);
        return
      }
      this.courseDetails = crs;
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
      this.router.navigate(['/'+RouterPaths.AUTH]);
      return;
    }
    const res = this.studentCoursesService.enrollInCourse(courseId);
    res.subscribe((res) => {
      console.log(res);
      this.isUserEnrolled = true;
      this.studentCoursesApiService.fetchStudentCoursesData().subscribe(res=>{
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
