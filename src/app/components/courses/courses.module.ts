import { NgModule } from '@angular/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { CourseAddEditComponent } from './course-add-edit/course-add-edit.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseStartComponent } from './course-start/course-start.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesComponent } from './courses.component';
import { EnrollmentDetailsComponent } from '../enrollment/enrollment-details/enrollment-details.component';
import { EnrollmentListComponent } from '../enrollment/enrollment-list/enrollment-list.component';
import { EnrollmentComponent } from '../enrollment/enrollment.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CourseAddEditComponent,
    CourseDetailsComponent,
    CourseStartComponent,
    EnrollmentComponent,
    EnrollmentListComponent,
    EnrollmentDetailsComponent,
  ],
  imports: [
    CoursesRoutingModule,
    SharedModule,
  ]
})
export class CoursesModule { }

