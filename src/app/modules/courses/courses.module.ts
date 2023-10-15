import { NgModule } from '@angular/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CourseAddEditComponent } from './components/course-add-edit/course-add-edit.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseStartComponent } from './components/course-start/course-start.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesComponent } from './courses.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CourseAddEditComponent,
    CourseDetailsComponent,
    CourseStartComponent,
  ],
  imports: [
    CoursesRoutingModule,
    SharedModule,
  ]
})
export class CoursesModule { }

