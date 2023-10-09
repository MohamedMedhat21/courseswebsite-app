import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/model/course.model';
import { CoursesService } from 'src/app/service/courses.service';
import { Constants } from 'src/app/utils/Constants';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.css'],
})
export class CourseAddEditComponent {
  course: Course = {
    id: 0,
    name: '',
    description: '',
    headline: '',
    instructorId: 0,
    instructorName: '',
    creationDate: new Date(),
    totalHours: 0,
    imagePath: '',
    courseLink: '',
  };

  constructor(
    private courseService: CoursesService,
    public dialogRef: MatDialogRef<CourseAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data) {
      this.setData(this.data.courseDetails);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(courseForm: NgForm) {
    if (!courseForm.valid) return;

    this.setData(courseForm.value);

    this.course.instructorName = Constants.CurrentLoggedUser.username;
    if(this.data)
      this.course.creationDate = this.data.courseDetails.creationDate;
    this.course.creationDateFormatted = Utils.formatDate(this.course.creationDate);

    if (this.data) {
      this.courseService.updateCourse(this.data.localIndex, this.course);
    } else {
      this.courseService.addCourse(this.course);
    }

   // courseForm.reset(); // not needed as we close the dialog if needed again do it in api response
    this.closeDialog();
  }

  private setData(data: any) {
    if(data.id)
      this.course.id = data.id;
    this.course.name = data.name;
    this.course.description = data.description;
    this.course.totalHours = data.totalHours;
    this.course.headline = data.headline;
    this.course.imagePath = data.imagePath;
    this.course.courseLink = data.courseLink;
    this.course.instructorId = Constants.CurrentLoggedUser.id;
  }
}
