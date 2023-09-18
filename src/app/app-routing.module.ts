import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/courses/course-details/course-details.component';
import { CoursesResolverService } from './components/courses/courses-resolver.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

const routes: Routes = [
  {path: 'courses',component:CoursesComponent,resolve:[CoursesResolverService],children:[
    // {path:'',component:RecipeStartComponent},
    // {path:'new',component:RecipeEditComponent},
    {path:':id',component:CourseDetailsComponent},
    // {path:':id/edit',component:RecipeEditComponent},
  ]},
  // {path: 'enrollments',component:CoursesComponent},
  {path: 'adminPanel',component:AdminPanelComponent},
  {path: 'aboutUs',component:AboutUsComponent},
  {path: 'auth',component:AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
