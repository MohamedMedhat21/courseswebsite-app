import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CoursesService } from 'src/app/service/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent {
  courses: Course[];
  isLoading = false;
  currID: number;

  constructor( private coursesService: CoursesService,private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    this.courses = this.coursesService.getCourses();
    this.isLoading = false;
  }

}
