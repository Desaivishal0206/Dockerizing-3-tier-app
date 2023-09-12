import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { ReactiveFormsModule } from '@angular/forms';
import { FoodComponent } from './components/food/food.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';


@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    FoodComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
