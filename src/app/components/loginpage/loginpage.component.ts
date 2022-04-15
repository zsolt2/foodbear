import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  signinForm: FormGroup;
  invalidLogin!: boolean;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['',{validators: [Validators.required, Validators.email], updateOn: 'blur'}],
      password: ['',{validators: [Validators.required], updateOn: 'blur'}],
    });
  }

  ngOnInit() {}

  loginUser() {
    try{
      if(this.signinForm.valid){
        this.authService.signIn(this.signinForm.value);
      }
    }catch(e){ 
      this.invalidLogin = true;
      console.log(this.invalidLogin);
      window.alert("Invalid Credentials");
    }
  }

  
}
