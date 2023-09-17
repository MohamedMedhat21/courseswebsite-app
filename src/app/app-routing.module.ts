import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CoursesResolverService } from './courses/courses-resolver.service';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  {path: 'courses',component:CoursesComponent,resolve:[CoursesResolverService],children:[
    // {path:'',component:RecipeStartComponent},
    // {path:'new',component:RecipeEditComponent},
    {path:':id',component:CourseDetailsComponent},
    // {path:':id/edit',component:RecipeEditComponent},
  ]},
  // {path: 'enrollments',component:CoursesComponent},
  {path: 'settings',component:SettingsComponent},
  {path: 'aboutUs',component:AboutUsComponent},
  {path: 'auth',component:AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
