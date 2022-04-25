import { Component, Input, OnInit } from '@angular/core';
import { Food } from 'src/app/models/Food';

@Component({
  selector: 'app-food-table',
  templateUrl: './food-table.component.html',
  styleUrls: ['./food-table.component.css']
})
export class FoodTableComponent implements OnInit {

  @Input() foods!: Food[];
  
  constructor() { }

  ngOnInit(): void {
  
  }

}
