import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import {MaindashboardComponent} from './UserDashboard/maindashboard/maindashboard.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component:MaindashboardComponent 
      },
      
    ])
  ],
  
})
export class UserDashboardModule { }
