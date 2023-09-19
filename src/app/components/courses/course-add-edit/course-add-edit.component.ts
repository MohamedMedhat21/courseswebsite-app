import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from 'src/app/service/courses.service';

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
  instructorName :string;

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
      this.instructorName = this.data.courseDetails.instructorId;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(courseForm: NgForm) {
    this.error = null;

    if (!courseForm.valid) return;

    this.courseName = courseForm.value.username;
    this.description = courseForm.value.email;
    this.instructorName = courseForm.value.roleName;


    if (this.data.courseDetails){
      this.id = this.data.courseDetails.id;
    }
    else{
      this.id = 0;
    }

    const course = {
      id: this.id,
      name: this.courseName,
      description: this.description,
      instructorId: this.instructorName,
    };

    if (this.data.courseDetails){
      // this.courseService.updateCourse(this.data.localIndex,course);
    }
    else{
      // this.courseService.addCourse(course);
    }


    courseForm.reset();
    this.closeDialog();
  }

}
