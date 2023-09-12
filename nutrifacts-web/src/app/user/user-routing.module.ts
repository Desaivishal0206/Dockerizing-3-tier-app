import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from '../guards/userAuth/user-auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FoodComponent } from './components/food/food.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,canActivate:[UserAuthGuard] },
  { path: 'fav-food', component: FoodComponent,canActivate:[UserAuthGuard] },
  { path: 'password-change', component:PasswordChangeComponent,canActivate:[UserAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
