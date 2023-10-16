import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Constants } from 'src/app/core/utils/Constants';
import { Utils } from 'src/app/core/utils/utils';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.css'],
})
export class CourseAddEditComponent {
  course: Course = {
    id: 0,
    name: '',
    nameAr:'',
    courseName:{en:'',ar:''},
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
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {}

  ngOnInit() {
    if (this.config.data) {
      this.setData(this.config.data.courseDetails);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(courseForm: NgForm) {
    if (!courseForm.valid) return;

    this.setData(courseForm.value);

    this.course.instructorName = Constants.CurrentLoggedUser.username;
    if(this.config.data)
      this.course.creationDate = this.config.data.courseDetails.creationDate;
    this.course.creationDateFormatted = Utils.formatDate(this.course.creationDate);

    if (this.config.data) {
      this.courseService.updateCourse(this.config.data.localIndex, this.course);
    } else {
      this.courseService.addCourse(this.course);
    }

   // courseForm.reset(); // not needed as we close the dialog if needed again do it in api response
    this.closeDialog();
  }

  private setData(data: any) {
    if(data.id)
      this.course.id = data.id;

      this.course.courseName.en = data.name;
      this.course.courseName.ar = data.nameAr;
    // }
    this.course.name = data.name;
    this.course.nameAr = data.nameAr;
    this.course.description = data.description;
    this.course.totalHours = data.totalHours;
    this.course.headline = data.headline;
    this.course.imagePath = data.imagePath;
    this.course.courseLink = data.courseLink;
    this.course.instructorId = Constants.CurrentLoggedUser.id;
  }
}
