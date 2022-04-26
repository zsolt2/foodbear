import { Injectable } from '@angular/core';
import { lastValueFrom} from 'rxjs';

import {
  HttpClient
} from '@angular/common/http';
import { Partner } from '../models/Partner';
import { BaseService } from './base.service';
import { Order } from '../models/Order';


@Injectable({
  providedIn: 'root'
})
export class PartnerService extends BaseService<Partner>{
  

  constructor(http:HttpClient) { 
    super(http, "partner");
  }

}
