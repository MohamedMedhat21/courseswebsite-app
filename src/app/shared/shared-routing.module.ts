import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPaths } from '../enums/router-paths.enum';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: RouterPaths.NOT_FOUND,component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
