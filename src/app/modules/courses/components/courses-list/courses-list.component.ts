import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseAddEditComponent } from '../course-add-edit/course-add-edit.component';
import { TranslateService } from '@ngx-translate/core';
import { RouterPaths } from 'src/app/core/enums/router-paths.enum';
import { Local } from 'src/app/core/interface/local.interface';
import { Constants } from 'src/app/core/utils/Constants';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [DialogService],
})
export class CoursesListComponent {
  courses: Course[];
  filteredCourses: Course[];
  isLoading = false;
  currID: number;
  currentPath: string;
  routerPaths = RouterPaths;
  currLang = this.translateService.currentLang as keyof Local;
  coursesDialogRef: DynamicDialogRef | undefined;


  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    public translateService:TranslateService,
    public courseDialogService: DialogService,
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

    this.translateService.onLangChange.subscribe(()=>{
      this.currLang = this.translateService.currentLang as keyof Local;
    })
  }

  openCourseDialog() {
    this.coursesDialogRef = this.courseDialogService.open(CourseAddEditComponent, {
      header: this.translateService.instant('INSTRUCTOR_COURSES.add_courses_btn'),
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  onEdit(localIndex: number, id: number) {
    const data = {
      courseDetails: this.filteredCourses[localIndex],
      localIndex: localIndex,
    };

    this.coursesDialogRef = this.courseDialogService.open(CourseAddEditComponent, {
      header: this.translateService.instant('INSTRUCTOR_COURSES.update_courses_btn'),
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
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
