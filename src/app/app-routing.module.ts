import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './core/components/about-us/about-us.component';
import { StartPageComponent } from './core/components/start-page/start-page.component';
import { RouterPaths } from './core/enums/router-paths.enum';


const routes: Routes = [
  { path: '', redirectTo: RouterPaths.HOME, pathMatch: 'full'},
  {path:RouterPaths.HOME,component:StartPageComponent},
  {path: RouterPaths.ABOUT_US,component:AboutUsComponent},
  { path: '**', redirectTo: RouterPaths.NOT_FOUND }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
