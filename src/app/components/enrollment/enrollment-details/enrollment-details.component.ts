import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Course } from 'src/app/model/course.model';
import { StudentCoursesData } from 'src/app/model/student-courses-data.model';
import { CoursesService } from 'src/app/service/courses.service';
import { StudentCoursesService } from 'src/app/service/student-courses.service';

@Component({
  selector: 'app-enrollment-details',
  templateUrl: './enrollment-details.component.html',
  styleUrls: ['./enrollment-details.component.css']
})
export class EnrollmentDetailsComponent {
  courseDetails: Course;
  id: number;
  crsId:number;
  courseVideosNumber:number;
  sanitizedCourseLink:any;

  constructor( private coursesService: CoursesService,private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private studentCourseData:StudentCoursesService,
    public translateService:TranslateService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.crsId = this.studentCourseData.getStudentCourseData(this.id).courseId;
      this.courseDetails = this.coursesService.getCourseByCourseId(this.crsId);
      this.courseVideosNumber = Math.floor(Math.random()*(100-11+1)+11)
      this.sanitizedCourseLink = this.domSanitizer.bypassSecurityTrustResourceUrl(this.courseDetails.courseLink);

    });

  }
}
