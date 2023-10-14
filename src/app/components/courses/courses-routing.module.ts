import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesResolverService } from '../../resolver/courses-resolver.service';
import { studentCoursesDataResolverService } from '../../resolver/student-courses-data-resolver.service';
import { EnrollmentComponent } from '../enrollment/enrollment.component';
import { AuthGuard } from '../auth/auth.guard';
import { EnrollmentDetailsComponent } from '../enrollment/enrollment-details/enrollment-details.component';
import { CourseStartComponent } from './course-start/course-start.component';
import { RouterPaths } from '../../enums/router-paths.enum';

const routes: Routes = [
  {path: RouterPaths.COURSES,component:CoursesComponent,resolve:[studentCoursesDataResolverService,CoursesResolverService]
  ,children:[
    { path: '', component: CourseStartComponent },
    {path:':id',component:CourseDetailsComponent},
  ]},
  {path: RouterPaths.ENROLLMENTS,component:EnrollmentComponent,resolve:[studentCoursesDataResolverService,CoursesResolverService],canActivate: [AuthGuard]
  ,children:[
    { path: '', component: CourseStartComponent },
    {path:':id',component:EnrollmentDetailsComponent},
  ]},
  {path: RouterPaths.PUBLISHED_COURSES,component:CoursesComponent,resolve:[CoursesResolverService],canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
