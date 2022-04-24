import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {

  @Input() orders!: Order[];

  constructor() { }

  ngOnInit(): void {
  }

  getFullPrice(order:Order):number{
    let price = 0
    order.foods.forEach(food => {
      console.log(food)
      price += food.price
    });
    return price
  }
}
