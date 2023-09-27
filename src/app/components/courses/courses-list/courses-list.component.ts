import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CoursesService } from 'src/app/service/courses.service';
import { CourseAddEditComponent } from '../course-add-edit/course-add-edit.component';
import { AuthService } from 'src/app/service/auth.service';
import { Constants } from 'src/app/utils/Constants';

// interface PageEvent {
//   first: number;
//   rows: number;
//   page: number;
//   pageCount: number;
// }

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
    private route: ActivatedRoute,
    private courseDialog: MatDialog,
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
        return value.instructorId === Constants.CurrentLoggedUser.id;
      });
    }
  }

  // first: number = 0;

  // rows: number = 2;

  // onPageChange(event: PageEvent){
  //   this.getModels(event.page + 1);
  // }

  // getModels(page: number = 1) {
  //   return this.courses.slice(page-1,Constants.defaultCoursesPagination.pageSize);
  // }
}
