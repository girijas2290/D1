import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaindashboardComponent } from './user-dashboard/UserDashboard/maindashboard/maindashboard.component';
import { LoginComponent } from './user/login/login.component';
const routes: Routes = [
  {path:'',pathMatch:'full',component:MaindashboardComponent},
  {path:'login',component:LoginComponent},
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
