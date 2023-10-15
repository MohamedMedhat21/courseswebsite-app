import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPaths } from 'src/app/core/enums/router-paths.enum';
import { AuthComponent } from './auth.component';


const routes: Routes = [
  {path: RouterPaths.AUTH,component:AuthComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
