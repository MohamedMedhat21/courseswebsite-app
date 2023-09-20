import { Component, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CoursesService } from 'src/app/service/courses.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent {
  courseDetails: Course;
  id: number;
  courseVideosNumber:number;
  sanitizedCourseLink:any;

  constructor( private coursesService: CoursesService,private route: ActivatedRoute,
    private router: Router,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // console.log(this.id)
      this.courseDetails = this.coursesService.getCourse(this.id);
      this.courseVideosNumber = Math.floor(Math.random()*(100-11+1)+11)
      this.sanitizedCourseLink = this.domSanitizer.bypassSecurityTrustResourceUrl(this.courseDetails.courseLink);
    });

  }
}
