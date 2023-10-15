import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AboutUsComponent } from './core/components/about-us/about-us.component';
import { SettingsComponent } from './core/components/settings/settings.component';
import { StartPageComponent } from './core/components/start-page/start-page.component';
import { httpInterceptorProviders } from './core/interceptor';
import { AdminPanelModule } from './modules/admin-panel/admin-panel.module';
import { CoursesModule } from './modules/courses/courses.module';
import { AuthModule } from './modules/auth/auth.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    AboutUsComponent,
    SettingsComponent,
  ],
  imports: [
    CoursesModule,
    AdminPanelModule,
    AuthModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient],
      },
    }),
    SharedModule,
    EnrollmentModule,
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
