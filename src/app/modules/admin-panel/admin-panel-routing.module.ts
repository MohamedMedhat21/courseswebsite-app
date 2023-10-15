import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { RouterPaths } from 'src/app/core/enums/router-paths.enum';
import { AuthGuard } from 'src/app/modules/auth/guards/auth.guard';
import { RolesResolverService } from 'src/app/modules/admin-panel/resolver/roles-resolver.service';
import { UsersResolverService } from 'src/app/modules/admin-panel/resolver/users-resolver.service';

const routes: Routes = [
  {path: RouterPaths.ADMIN_PANEL,component:AdminPanelComponent,resolve:[UsersResolverService,RolesResolverService],canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
