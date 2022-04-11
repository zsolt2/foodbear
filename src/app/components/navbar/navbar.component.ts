import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  @Input() currentUser!:User;

  ngOnInit(): void {
    const userID = this.currentUser.isAdmin;
  }

}
