import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';
import { Role } from '../../models/role.model';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent {

  roles:Role[];

  constructor(private roleService:RolesService,private roleDialog:MatDialog){

  }

  ngOnInit(){
    this.roleService.rolesChanged.subscribe(roles =>{
      this.roles = roles;
    })

    this.roles = this.roleService.getRoles();
  }

  openRoleDialog(){
    const roleDialogRef = this.roleDialog.open(RoleAddEditComponent);
  }

  onDelete(id:number){
    const isDelete = confirm("are you sure you want to delete this role?")
    if(isDelete){
      this.roleService.deleteRole(id);
    }
  }

  onEdit(localIndex:number,id:number){

    const data = {
      roleDetails:this.roles[localIndex],
      localIndex:localIndex
    }

    const roleDialogRef = this.roleDialog.open(RoleAddEditComponent,{
      data: data
    });
  }


}
