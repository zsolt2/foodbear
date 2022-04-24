import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/models/Food';
import { FoodService } from 'src/app/services/food.service';
@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css']
})
export class FoodDetailsComponent implements OnInit {

  @Input() food!: Food;

  constructor(private router:Router, private activatedRoute: ActivatedRoute, private foodService: FoodService) { 
   this.router.getCurrentNavigation()?.extras.state
  }

  async ngOnInit(): Promise<void> {
    this.food=history.state.food;
    if(!this.food){
      try{
        this.food = await this.foodService.get(parseInt(this.activatedRoute.snapshot.paramMap.get('id')!));
      }catch(err){
        console.log(err);
      }
    }
  }

}
