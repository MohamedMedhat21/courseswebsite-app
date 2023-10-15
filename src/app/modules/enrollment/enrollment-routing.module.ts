import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPaths } from 'src/app/core/enums/router-paths.enum';
import { AuthGuard } from 'src/app/modules/auth/guards/auth.guard';
import { CoursesResolverService } from 'src/app/modules/courses/resolver/courses-resolver.service';
import { studentCoursesDataResolverService } from 'src/app/modules/enrollment/resolver/student-courses-data-resolver.service';
import { EnrollmentDetailsComponent } from './components/enrollment-details/enrollment-details.component';
import { EnrollmentComponent } from './enrollment.component';
import { CourseStartComponent } from '../courses/components/course-start/course-start.component';

const routes: Routes = [
  {
    path: RouterPaths.ENROLLMENTS,
    component: EnrollmentComponent,
    resolve: [studentCoursesDataResolverService, CoursesResolverService],
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CourseStartComponent },
      { path: ':id', component: EnrollmentDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnrollmentRoutingModule {}
