import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/service/users.service';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  users:User[];

  constructor(private userService:UsersService,private userDialog:MatDialog){
    userService.usersChanged.subscribe(users =>{
      this.users = users;
    })
  }

  openUserDialog(){
    const userDialogRef = this.userDialog.open(UserAddEditComponent);
    // dia.afterClosed().subscribe(result => {
    //   console.log('Dialog closed:', result);
    // });
  }

  ngOnInit(){
    this.users = this.userService.getUsers();
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
