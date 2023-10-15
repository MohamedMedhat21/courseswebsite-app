import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';


import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentDetailsComponent } from './components/enrollment-details/enrollment-details.component';
import { EnrollmentListComponent } from './components/enrollment-list/enrollment-list.component';
import { EnrollmentComponent } from './enrollment.component';


@NgModule({
  declarations: [
    EnrollmentComponent,
    EnrollmentListComponent,
    EnrollmentDetailsComponent,
  ],
  imports: [
    EnrollmentRoutingModule,
    SharedModule,
  ]
})
export class EnrollmentModule { }

