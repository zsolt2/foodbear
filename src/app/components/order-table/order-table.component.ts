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

  getFoods(order:Order):string{
    let foods = ''
    order.foods.forEach(food => {
      foods += food.name + '\n'
    });
    return foods
  }

  getFullPrice(order:Order):number{
    let price = 0
    order.foods.forEach(food => {
      price += food.price
    });
    return price
  }
}
