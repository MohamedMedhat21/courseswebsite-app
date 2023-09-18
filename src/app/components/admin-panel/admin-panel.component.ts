import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  users:User[];

  constructor(private userService:UsersService){
    userService.usersChanged.subscribe(users =>{
      this.users = users;
    })
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

  onEdit(id:number){

  }

}
