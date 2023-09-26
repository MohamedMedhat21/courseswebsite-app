import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/service/users.service';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  users:User[];

  constructor(private userService:UsersService,private userDialog:MatDialog){

  }

  ngOnInit(){
    this.userService.usersChanged.subscribe(users =>{
      this.users = users;
    })

    this.users = this.userService.getUsers();
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
    this.userService.exportUsers();
  }


}
