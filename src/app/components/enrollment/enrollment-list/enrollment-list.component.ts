import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCoursesData } from 'src/app/model/student-courses-data.model';
import { StudentCoursesDataService } from 'src/app/service/student-courses-data.service';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent {
  studentCoursesData: StudentCoursesData[];
  isLoading = false;

  constructor(private studentCoursesDataService:StudentCoursesDataService,private router: Router,
    private route: ActivatedRoute) {
      studentCoursesDataService.studentCoursesDataChanged.subscribe(studentCoursesData=>{
        this.studentCoursesData = studentCoursesData;
      })
  }

  ngOnInit() {
    this.isLoading = true;
    this.studentCoursesData = this.studentCoursesDataService.getStudentCoursesData();
    this.isLoading = false;
  }

  onUnenroll(localIndex:number,id:number){
    const isDelete = confirm("are you sure you want to unenroll from this course?")
    if(isDelete){
      this.studentCoursesDataService.unenroll(localIndex,id);
    }
  }
}
