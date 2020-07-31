import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userform:FormGroup;
  firstname:FormControl;
  lastname:FormControl;
  profileform: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
   
  }

  
}
