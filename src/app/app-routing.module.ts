import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/courses/course-details/course-details.component';
import { CoursesResolverService } from './resolver/courses-resolver.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UsersResolverService } from './resolver/users-resolver.service';
import { studentCoursesDataResolverService } from './resolver/student-courses-data-resolver.service';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { AuthGuard } from './components/auth/auth.guard';
import { RolesResolverService } from './resolver/roles-resolver.service';
import { EnrollmentDetailsComponent } from './components/enrollment/enrollment-details/enrollment-details.component';
import { CourseStartComponent } from './components/courses/course-start/course-start.component';
import { RouterPaths } from './enums/router-paths.enum';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:RouterPaths.HOME,component:StartPageComponent},
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
  {path: RouterPaths.ADMIN_PANEL,component:AdminPanelComponent,resolve:[UsersResolverService,RolesResolverService],canActivate: [AuthGuard]},
  {path: RouterPaths.ABOUT_US,component:AboutUsComponent},
  {path: RouterPaths.AUTH,component:AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
