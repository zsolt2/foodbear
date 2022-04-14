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
      email: ['',{validators: [Validators.required, Validators.email], updateOn: 'submit'}],
      password: ['',{validators: [Validators.required], updateOn: 'submit'}],
    });
  }

  ngOnInit() {}

  loginUser() {
    if (this.signinForm.valid) {
      this.authService.signIn(this.signinForm.value).subscribe({
        next: profileData => {
          alert(JSON.stringify(profileData)); // TODO: delete this line
          this.router.navigate(['mainpage']);
        },
        error: err => {
          this.invalidLogin = true;
          console.error('Login error:', err); // TODO: delete this line
          window.alert("Invalid Credentials");
        }
      });
    }
  }
}
