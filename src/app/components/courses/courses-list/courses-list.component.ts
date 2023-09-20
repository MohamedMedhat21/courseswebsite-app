import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CoursesService } from 'src/app/service/courses.service';
import { CourseAddEditComponent } from '../course-add-edit/course-add-edit.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent {
  courses: Course[];
  isLoading = false;
  currID: number;

  constructor( private coursesService: CoursesService,private router: Router,private route: ActivatedRoute,
    private courseDialog:MatDialog) {
      coursesService.coursesChanged.subscribe(courses=>{
        this.courses = courses
      })
    }

  ngOnInit() {
    this.isLoading = true;
    this.courses = this.coursesService.getCourses();
    this.isLoading = false;
  }

  openCourseDialog(){
    const courseDialogRef = this.courseDialog.open(CourseAddEditComponent);
  }

  onEdit(localIndex:number,id:number){

    const data = {
      courseDetails:this.courses[localIndex],
      localIndex:localIndex
    }

    const userDialogRef = this.courseDialog.open(CourseAddEditComponent,{
      data: data
    });
  }

  onDelete(localIndex:number,id:number){
    const isDelete = confirm("are you sure you want to delete this user?")
    if(isDelete){
      this.coursesService.deleteCourse(localIndex,id);
    }
  }

}
