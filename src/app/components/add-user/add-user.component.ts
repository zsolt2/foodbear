import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  registerForm: FormGroup;

  constructor( public authService:AuthService,
               public fb:FormBuilder) { 
    this.registerForm = this.fb.group({
          email: [''],
          password: [''],
          name: [''],
          isAdmin: [''],
        });
  }

  ngOnInit(): void {
  }

}
