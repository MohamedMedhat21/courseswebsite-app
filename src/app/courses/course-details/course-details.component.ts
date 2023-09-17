import { Component, Input } from '@angular/core';
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

  constructor( private coursesService: CoursesService,private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id)
      this.courseDetails = this.coursesService.getCourse(this.id);
    });

  }
}
