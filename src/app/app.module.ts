import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesListComponent } from './components/courses/courses-list/courses-list.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { CourseDetailsComponent } from './components/courses/course-details/course-details.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FormsModule } from '@angular/forms';
import { UserAddEditComponent } from './components/admin-panel/user-management/user-add-edit/user-add-edit.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CourseAddEditComponent } from './components/courses/course-add-edit/course-add-edit.component'
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { EnrollmentListComponent } from './components/enrollment/enrollment-list/enrollment-list.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { UserManagementComponent } from './components/admin-panel/user-management/user-management.component';
import { RoleManagementComponent } from './components/admin-panel/role-management/role-management.component';
import { RoleAddEditComponent } from './components/admin-panel/role-management/role-add-edit/role-add-edit.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { EnrollmentDetailsComponent } from './components/enrollment/enrollment-details/enrollment-details.component';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { FooterComponent } from './shared/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { CourseStartComponent } from './components/courses/course-start/course-start.component';
import { httpInterceptorProviders } from './interceptors';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
    SettingsComponent,
    UserAddEditComponent,
    CourseAddEditComponent,
    EnrollmentComponent,
    EnrollmentListComponent,
    StartPageComponent,
    UserManagementComponent,
    RoleManagementComponent,
    RoleAddEditComponent,
    EnrollmentDetailsComponent,
    FooterComponent,
    CourseStartComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatMenuModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    TableModule,
    MenubarModule,
    CardModule,
    PaginatorModule,
    DropdownModule,
    ToastModule,
    MessagesModule,
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  exports:[
    TranslateModule
  ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}