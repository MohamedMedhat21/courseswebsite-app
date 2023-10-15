import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { RouterPaths } from 'src/app/core/enums/router-paths.enum';
import { AuthGuard } from 'src/app/modules/auth/guards/auth.guard';
import { CoursesResolverService } from 'src/app/modules/courses/resolver/courses-resolver.service';
import { studentCoursesDataResolverService } from 'src/app/modules/enrollment/resolver/student-courses-data-resolver.service';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseStartComponent } from './components/course-start/course-start.component';

const routes: Routes = [
  {path: RouterPaths.COURSES,component:CoursesComponent,resolve:[studentCoursesDataResolverService,CoursesResolverService]
  ,children:[
    { path: '', component: CourseStartComponent },
    {path:':id',component:CourseDetailsComponent},
  ]},
  {path: RouterPaths.PUBLISHED_COURSES,component:CoursesComponent,resolve:[CoursesResolverService],canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
