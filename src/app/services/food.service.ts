import { Injectable } from '@angular/core';
import { lastValueFrom} from 'rxjs';

import {
  HttpClient
} from '@angular/common/http';
import { Food } from '../models/Food';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  createFood(food:Food){
      return lastValueFrom(this.http.post<Food>('/api/createfood', food));
  }

  getFood(id:number){
    return lastValueFrom(this.http.get<Food>(`/api/food/${id}`));
  }

  getAllFoods(){
    return lastValueFrom(this.http.get<Food[]>('/api/food'));
  }

  deleteFood(id:number){
    return lastValueFrom(this.http.delete(`/api/food/${id}`));
  }

}
