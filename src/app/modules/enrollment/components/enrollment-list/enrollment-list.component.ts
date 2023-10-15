import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCoursesData } from '../../models/student-courses-data.model';
import { StudentCoursesService } from '../../services/student-courses.service';
import { RouterPaths } from 'src/app/core/enums/router-paths.enum';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css'],
})
export class EnrollmentListComponent {
  studentCoursesData: StudentCoursesData[];
  isLoading = false;
  selectedCourseLocalIndex:number;
  selectedCourseLocalId:number
  items: MenuItem[] | undefined;

  constructor(
    private studentCoursesDataService: StudentCoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Unenroll',
        icon: 'pi pi-refresh',
        command: () => {
          this.onUnenroll(this.selectedCourseLocalIndex,this.selectedCourseLocalId);
        },
      }
    ];

    this.isLoading = true;
    this.studentCoursesData =
      this.studentCoursesDataService.getStudentCoursesData();
    this.isLoading = false;

    this.studentCoursesDataService.studentCoursesDataChanged.subscribe(
      (studentCoursesData) => {
        this.studentCoursesData = studentCoursesData;
      }
    );
  }

  onUnenroll(localIndex: number, id: number) {
    const isDelete = confirm(
      'are you sure you want to unenroll from this course?'
    );
    if (isDelete) {
      this.studentCoursesDataService.unenroll(
        id,
        this.studentCoursesData[localIndex].userId
      );
      this.router.navigate(['/' + RouterPaths.ENROLLMENTS]);
    }
  }

  getCourseIndexes(localIndex: number, id: number){
    this.selectedCourseLocalIndex = localIndex;
    this.selectedCourseLocalId = id;
  }
}
