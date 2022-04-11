import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  constructor(private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    console.log( await this.authService.isAdmin() );
  }

}
