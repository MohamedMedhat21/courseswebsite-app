import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesListComponent } from './components/courses/courses-list/courses-list.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { CourseDetailsComponent } from './components/courses/course-details/course-details.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CoursesComponent,
    CoursesListComponent,
    LoadingSpinnerComponent,
    CourseDetailsComponent,
    AboutUsComponent,
    AuthComponent,
    AdminPanelComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
