import { Component, Input, OnInit } from '@angular/core';
import { Partner } from '../../models/Partner';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  @Input() partner!: Partner;
  
  constructor() { }

  ngOnInit(): void {
  }

}
