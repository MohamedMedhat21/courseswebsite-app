import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    SharedRoutingModule,
    FormsModule,
    ToastModule,
    CardModule,
    ButtonModule,
    MatDialogModule,
    SidebarModule,
    MenuModule,
    TableModule,
    MenubarModule,
    PaginatorModule,
    DropdownModule,
    MessagesModule,
    TranslateModule,
    TabMenuModule,
    DynamicDialogModule,
    CheckboxModule,
  ],
  exports:[
    LoadingSpinnerComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastModule,
    CardModule,
    ButtonModule,
    MatDialogModule,
    SidebarModule,
    MenuModule,
    TableModule,
    MenubarModule,
    PaginatorModule,
    DropdownModule,
    MessagesModule,
    TranslateModule,
    TabMenuModule,
    DynamicDialogModule,
    CheckboxModule,
  ]
})
export class SharedModule { }
