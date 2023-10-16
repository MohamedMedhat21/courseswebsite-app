import { Component } from '@angular/core';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

// interface PageEvent {
//   first: number;
//   rows: number;
//   page: number;
//   pageCount: number;
// }

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  providers: [DialogService],
})
export class UserManagementComponent {

  users:User[];
  usersPaginatedList:User[];
  itemsPerPage = 3;
  currentPage = 1;
  isExportBtnLoading = false;
  userDialogRef: DynamicDialogRef | undefined;


  constructor(private userService:UsersService,public userDialogService: DialogService,public translateService:TranslateService){
  }

  ngOnInit(){
    this.userService.usersChanged.subscribe(users =>{
      this.users = users;

      this.onPageChange({
        page: this.currentPage - 1,
        first: (this.currentPage - 1) * this.itemsPerPage,
        rows: this.itemsPerPage
      });
    })

    this.users = this.userService.getUsers();

    this.onPageChange({
      page: 0,
      first: 0,
      rows: this.itemsPerPage
    });
  }

  openUserDialog(){
    this.userDialogRef = this.userDialogService.open(UserAddEditComponent, {
      header: this.translateService.instant('ADMIN_PANEL_PAGE.new_user_btn'),
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  onDelete(id:number){
    const isDelete = confirm(this.translateService.instant('Shared.delete_confirm_msg'))
    if(isDelete){
      this.userService.deleteUser(id);
    }
  }

  onEdit(localIndex:number,id:number){

    const data = {
      userDetails:this.users[localIndex],
      localIndex:localIndex
    }
    // console.log(this.users[localIndex])

    this.userDialogRef = this.userDialogService.open(UserAddEditComponent, {
      header: this.translateService.instant('ADMIN_PANEL_PAGE.update_user_btn'),
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: data,
    });
  }

  onExportUsers(){
    this.isExportBtnLoading = true;
    this.userService.exportUsers();
    this.isExportBtnLoading = false;
  }

  onPageChange(event: any){
    this.currentPage = event.page + 1;
    this.usersPaginatedList = this.users.slice(
      event.first,
      event.first + this.itemsPerPage
    );
  }

}
