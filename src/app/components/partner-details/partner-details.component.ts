import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/models/Food';
import { Order } from 'src/app/models/Order';
import { Partner } from 'src/app/models/Partner';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent implements OnInit {

  partner!: Partner;
  orders!: Order[];

  constructor(private partnerService: PartnerService, private activatedRoute: ActivatedRoute,
    private foodService: FoodService, private orderService: OrderService) { }

  async ngOnInit(): Promise<void> {

    try {

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.partner = await this.partnerService.get(parseInt(id!));
      this.orders = await this.orderService.getOrderByPartnerId(parseInt(id!));
      console.log(this.partner);
    } catch (err) {
      
    }
  }

}
