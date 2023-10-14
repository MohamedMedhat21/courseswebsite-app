import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { AuthGuard } from '../auth/auth.guard';
import { RouterPaths } from '../../enums/router-paths.enum';
import { RolesResolverService } from '../../resolver/roles-resolver.service';
import { UsersResolverService } from '../../resolver/users-resolver.service';

const routes: Routes = [
  {path: RouterPaths.ADMIN_PANEL,component:AdminPanelComponent,resolve:[UsersResolverService,RolesResolverService],canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
