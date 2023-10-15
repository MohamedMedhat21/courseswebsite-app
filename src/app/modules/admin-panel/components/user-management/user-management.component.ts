import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';

import { TranslateService } from '@ngx-translate/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

// interface PageEvent {
//   first: number;
//   rows: number;
//   page: number;
//   pageCount: number;
// }

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  users:User[];
  usersPaginatedList:User[];
  itemsPerPage = 3;
  currentPage = 1;
  isExportBtnLoading = false;


  constructor(private userService:UsersService,private userDialog:MatDialog,public translateService:TranslateService){
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
    const userDialogRef = this.userDialog.open(UserAddEditComponent);
    // dia.afterClosed().subscribe(result => {
    //   console.log('Dialog closed:', result);
    // });
  }

  onDelete(id:number){
    const isDelete = confirm(this.translateService.instant('Shared.delete_confirm_msg'))
    if(isDelete){
      this.userService.deleteUser(id);
    }
  }

  onEdit(localIndex:number,id:number){

    // console.log(localIndex)
    const data = {
      userDetails:this.users[localIndex],
      localIndex:localIndex
    }
    // console.log(data)

    const userDialogRef = this.userDialog.open(UserAddEditComponent,{
      data: data
    });
  }

  onExportUsers(){
    this.isExportBtnLoading = true;
    this.userService.exportUsers();
    this.isExportBtnLoading = false;
  }

  onPageChange(event: any){
    // console.log(event)
    this.currentPage = event.page + 1;
    this.usersPaginatedList = this.users.slice(
      event.first,
      event.first + this.itemsPerPage
    );
  }

}
