import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/app/model/role.model';
import { RolesService } from 'src/app/service/roles.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent {

  roles:Role[];

  constructor(private roleService:RolesService,private userDialog:MatDialog){

  }

  ngOnInit(){
    this.roleService.rolesChanged.subscribe(roles =>{
      this.roles = roles;
    })

    this.roles = this.roleService.getRoles();
  }

  openUserDialog(){
    // const userDialogRef = this.userDialog.open(UserAddEditComponent);
  }

  onDelete(id:number){
    const isDelete = confirm("are you sure you want to delete this user?")
    if(isDelete){
      // this.userService.deleteUser(id);
    }
  }

  onEdit(localIndex:number,id:number){

    const data = {
      // userDetails:this.users[localIndex],
      localIndex:localIndex
    }

    // const userDialogRef = this.userDialog.open(UserAddEditComponent,{
    //   data: data
    // });
  }


}
