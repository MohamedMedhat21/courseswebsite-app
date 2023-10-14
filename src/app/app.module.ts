import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthComponent } from './components/auth/auth.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { httpInterceptorProviders } from './interceptors';
import { CoursesModule } from './components/courses/courses.module';
import { SharedModule } from './shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminPanelModule } from './components/admin-panel/admin-panel.module';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    AboutUsComponent,
    AuthComponent,
    SettingsComponent,
  ],
  imports: [
    CoursesModule,
    AdminPanelModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient],
      },
    }),
    SharedModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
