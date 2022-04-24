import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Order } from '../models/Order';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService{

  constructor(http:HttpClient) { 
    super(http, "partner");
  }

  getOrderByPartnerId(partnerId:number){
    return lastValueFrom(this.http.get<Order[]>(`/api/order/partner/${partnerId}`));
  }

  async getCourierByFoodId(foodId:number):Promise<Order[]>{
    
    return await lastValueFrom(this.http.get<Order[]>(`api/order/food/${foodId}`));


}
  
}
