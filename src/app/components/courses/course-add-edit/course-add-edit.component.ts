import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/model/course.model';
import { CoursesService } from 'src/app/service/courses.service';
import { UsersService } from 'src/app/service/users.service';
import { Constants } from 'src/app/utils/Constants';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.css']
})
export class CourseAddEditComponent {

  error: any;
  id:number;
  courseName : string;
  description : string;
  totalHours:number;
  headline:string;
  imagePath:string;
  courseLink:string;
  creationDate:Date;
  instructorId:number;

  constructor(
    private courseService:CoursesService,
    public dialogRef: MatDialogRef<CourseAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data){
      this.id = this.data.courseDetails.id;
      this.courseName = this.data.courseDetails.name;
      this.description = this.data.courseDetails.description;
      this.totalHours = this.data.courseDetails.totalHours;
      this.headline = this.data.courseDetails.headline;
      this.imagePath = this.data.courseDetails.imagePath;
      this.courseLink = this.data.courseDetails.courseLink;
      this.creationDate = this.data.courseDetails.creationDate;
      this.instructorId = this.data.courseDetails.instructorId;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(courseForm: NgForm) {
    this.error = null;

    if (!courseForm.valid) return;

    this.courseName = courseForm.value.courseName;
    this.description = courseForm.value.description;
    this.totalHours = courseForm.value.totalHours;
    this.headline = courseForm.value.headline;
    this.imagePath = courseForm.value.imagePath;
    this.courseLink = courseForm.value.courseLink;
    this.instructorId = Constants.CurrentUserId;



    if (this.data){
      this.id = this.data.courseDetails.id;
      this.creationDate = this.data.courseDetails.creationDate;
    }
    else{
      // this.id = 0;
      this.creationDate = new Date();
    }

    const course:Course = {
      id: this.id,
      name: this.courseName,
      description: this.description,
      totalHours: this.totalHours,
      headline: this.headline,
      imagePath: this.imagePath,
      courseLink: this.courseLink,
      creationDate: this.creationDate,
      instructorId: this.instructorId
    };

    if (this.data){
      this.courseService.updateCourse(this.data.localIndex,course);
    }
    else{
      this.courseService.addCourse(course);
    }


    courseForm.reset();
    this.closeDialog();
  }

}
