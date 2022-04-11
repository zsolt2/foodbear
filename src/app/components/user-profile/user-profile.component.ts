import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private authService:AuthService) { }
  @Input() user!:User;
  ngOnInit( ): void {
    if(!this.user)
      this.user = this.authService.getCurrentUser();
  }

}
