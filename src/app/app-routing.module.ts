import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthComponent } from './components/auth/auth.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { RouterPaths } from './enums/router-paths.enum';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: RouterPaths.HOME, pathMatch: 'full'},
  {path:RouterPaths.HOME,component:StartPageComponent},
  {path: RouterPaths.ABOUT_US,component:AboutUsComponent},
  {path: RouterPaths.AUTH,component:AuthComponent},
  { path: '**', redirectTo: RouterPaths.NOT_FOUND }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
