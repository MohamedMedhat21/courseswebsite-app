import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/courses/course-details/course-details.component';
import { CoursesResolverService } from './resolver/courses-resolver.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UsersResolverService } from './resolver/users-resolver.service';
import { studentCoursesDataResolverService } from './resolver/student-courses-data.service';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { StartPageComponent } from './components/start-page/start-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home',component:StartPageComponent},
  {path: 'courses',component:CoursesComponent,resolve:[CoursesResolverService],children:[
    // {path:'',component:RecipeStartComponent},
    // {path:'new',component:RecipeEditComponent},
    {path:':id',component:CourseDetailsComponent},
    // {path:':id/edit',component:RecipeEditComponent},
  ]},
  {path: 'enrollments',component:EnrollmentComponent,resolve:[studentCoursesDataResolverService]},
  {path: 'publishedCourses',component:CoursesComponent,resolve:[CoursesResolverService]},
  {path: 'adminPanel',component:AdminPanelComponent,resolve:[UsersResolverService]},
  {path: 'aboutUs',component:AboutUsComponent},
  {path: 'auth',component:AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
