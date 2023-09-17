import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CoursesResolverService } from './courses/courses-resolver.service';

const routes: Routes = [
  {path: 'courses',component:CoursesComponent,resolve:[CoursesResolverService],children:[
    // {path:'',component:RecipeStartComponent},
    // {path:'new',component:RecipeEditComponent},
    {path:':id',component:CourseDetailsComponent},
    // {path:':id/edit',component:RecipeEditComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
