import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CoursesService } from 'src/app/service/courses.service';
import { CourseAddEditComponent } from '../course-add-edit/course-add-edit.component';
import { Constants } from 'src/app/utils/Constants';
import { RouterPaths } from 'src/app/enums/router-paths.enum';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent {
  courses: Course[];
  filteredCourses: Course[];
  isLoading = false;
  currID: number;
  currentPath: string;
  routerPaths = RouterPaths;


  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private courseDialog: MatDialog,
    public translateService:TranslateService
  ) {
  }

  ngOnInit() {
    this.currentPath = this.route.snapshot.routeConfig?.path!;
    this.isLoading = true;
    this.getData(this.coursesService.getCourses());
    this.isLoading = false;

    this.coursesService.coursesChanged.subscribe(courses => {
      this.getData(courses);
    });

    Constants.courseFilter.subscribe(query => {
      this.filterData(query);
    });

  }

  openCourseDialog() {
    const courseDialogRef = this.courseDialog.open(CourseAddEditComponent);
  }

  onEdit(localIndex: number, id: number) {
    const data = {
      courseDetails: this.filteredCourses[localIndex],
      localIndex: localIndex,
    };

    const userDialogRef = this.courseDialog.open(CourseAddEditComponent, {
      data: data,
    });
  }

  onDelete(id: number) {
    const isDelete = confirm(this.translateService.instant('Shared.delete_confirm_msg'));
    if (isDelete) {
      this.coursesService.deleteCourse(id);
    }
  }

  getData(courses:Course[]) {
    this.courses = courses;
    if (this.currentPath === RouterPaths.PUBLISHED_COURSES) {
      this.filteredCourses = this.courses.filter((value) => {
        return value.instructorId === Constants.CurrentLoggedUser.id;
      });
    }else{
      this.filteredCourses = this.courses
    }
  }

  filterData(query:string) {
    // console.log(query)
    if(query === ''||this.currentPath === RouterPaths.PUBLISHED_COURSES){
      this.getData(this.coursesService.getCourses());
      return;
    }

    this.filteredCourses = this.courses.filter((crs) => {
      return crs.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
  }

  getCrsIdForRouter(id:number ):string{
    const crs = this.filteredCourses[id];
    let reIdx = -1;
    this.courses.forEach((element,idx) => {
      if(element.id === crs.id)
        reIdx =  idx;
    });
    return reIdx + '';
  }

}
