import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import  {MatTableModule,MatSortModule,MatPaginatorModule,MatSnackBarModule
  //,MatExpansionModule,MatToolbarModule,MatDialogModule,MatProgressSpinnerModule,MatSelectModule,MatCardModule,MatIconModule,MatNativeDateModule, MatSidenavModule,MatDatepickerModule, MatListModule,MatFormFieldModule, MatButtonModule,MatInputModule,MatTabsModule } from  '@angular/material';

import { LoginComponent } from './user/login/login.component';
import { MaindashboardComponent } from './user-dashboard/UserDashboard/maindashboard/maindashboard.component';

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,  MaindashboardComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
