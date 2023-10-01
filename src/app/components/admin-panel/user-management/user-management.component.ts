import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/service/users.service';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { Role } from 'src/app/model/role.model';
import { RolesService } from 'src/app/service/roles.service';
import { Constants } from 'src/app/utils/Constants';

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


  constructor(private userService:UsersService,private userDialog:MatDialog){
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
    const isDelete = confirm("are you sure you want to delete this user?")
    if(isDelete){
      this.userService.deleteUser(id);
    }
  }

  onEdit(localIndex:number,id:number){

    console.log(localIndex)
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
    console.log(event)
    this.currentPage = event.page + 1;
    this.usersPaginatedList = this.users.slice(
      event.first,
      event.first + this.itemsPerPage
    );
  }

}
