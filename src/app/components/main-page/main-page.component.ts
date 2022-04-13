import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  currentUser!: User;

  constructor(public authService:AuthService) { }

   async ngOnInit(): Promise<void> {
      //this.authService.getUserProfile().subscribe((user) => this.currentUser = user);
     this.currentUser = await this.authService.getCurrentUser();
     
      console.log("Main page"); console.log(this.currentUser);
  }

}
