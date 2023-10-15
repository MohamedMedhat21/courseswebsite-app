import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Course } from 'src/app/modules/courses/models/course.model';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';
import { StudentCoursesService } from '../../services/student-courses.service';
import { RouterPaths } from 'src/app/core/enums/router-paths.enum';

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
    public translateService:TranslateService,
    private router:Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      const crs = this.studentCourseData.getStudentCourseData(this.id);
      if(!crs){
        this.router.navigate(['/'+RouterPaths.NOT_FOUND]);
        return
      }
      this.crsId = crs.courseId;
      this.courseDetails = this.coursesService.getCourseByCourseId(this.crsId);
      this.courseVideosNumber = Math.floor(Math.random()*(100-11+1)+11)
      this.sanitizedCourseLink = this.domSanitizer.bypassSecurityTrustResourceUrl(this.courseDetails.courseLink);

    });

  }
}
