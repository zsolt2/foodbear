import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/models/Partner';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent implements OnInit {

  partner!: Partner;

  constructor(private partnerService:PartnerService) { }

  async ngOnInit(): Promise<void> {
    this.partner = await this.partnerService.get(1);
  }

}
