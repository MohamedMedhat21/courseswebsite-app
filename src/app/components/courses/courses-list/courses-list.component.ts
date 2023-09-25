import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CoursesService } from 'src/app/service/courses.service';
import { CourseAddEditComponent } from '../course-add-edit/course-add-edit.component';
import { AuthService } from 'src/app/service/auth.service';
import { Constants } from 'src/app/utils/Constants';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent {
  courses: Course[];
  isLoading = false;
  currID: number;
  currentPath: string;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private courseDialog: MatDialog,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.currentPath = this.route.snapshot.routeConfig?.path!;
    this.isLoading = true;
    this.getData(this.coursesService.getCourses());
    this.isLoading = false;

    this.coursesService.coursesChanged.subscribe(courses => {
      this.getData(courses);
      // console.log('hello')
    });

  }

  openCourseDialog() {
    const courseDialogRef = this.courseDialog.open(CourseAddEditComponent);
  }

  onEdit(localIndex: number, id: number) {
    const data = {
      courseDetails: this.courses[localIndex],
      localIndex: localIndex,
    };

    const userDialogRef = this.courseDialog.open(CourseAddEditComponent, {
      data: data,
    });
  }

  onDelete(id: number) {
    const isDelete = confirm('are you sure you want to delete this course?');
    if (isDelete) {
      this.coursesService.deleteCourse(id);
    }
  }

  getData(courses:Course[]) {
    this.courses = courses;
    if (this.currentPath === 'publishedCourses') {
      this.courses = this.courses.filter((value) => {
        return value.instructorId === Constants.CurrentUserId;
      });
    }
  }
}
