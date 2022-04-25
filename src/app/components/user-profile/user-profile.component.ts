import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() onUserDeleted = new EventEmitter<any>();

  ngOnInit( ): void {
    if(!this.user)
      this.authService.getUserProfile().subscribe((user)=>this.user=user);
  }

  async deleteUser(){
    try{
      await this.authService.deleteUser(this.user.id);
      this.onUserDeleted.emit();
      // ToDo: fix when know how to throw error 
      const currentUser = (await this.authService.getCurrentUser()).id;
      if(currentUser === this.user.id){
        this.authService.doLogout();
      }
    }catch(err){
      alert("You can not delete your own profile.\nContact your admin to delete yor profile");
      console.log(err);
    }
  }

}
