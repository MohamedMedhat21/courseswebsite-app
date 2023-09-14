import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Course } from 'src/app/model/course.model';
import { CoursesService } from 'src/app/service/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent {
  courses: Course[];
  subscription: Subscription;
  isLoading = false;

  constructor(
    private coursesService: CoursesService,private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading=true
    this.subscription = this.coursesService.servers$.subscribe(courses =>{
      this.courses = courses;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
