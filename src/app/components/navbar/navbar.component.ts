import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  @Input() currentUser!:User;
  @Input() authService!:AuthService;

  ngOnInit(): void {
    console.log('Navbar: '); console.log(this.currentUser);
  }

  logout(){
    this.authService.doLogout();
  }


}
