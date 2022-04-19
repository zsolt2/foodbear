import { Injectable } from '@angular/core';
import { lastValueFrom} from 'rxjs';

import {
  HttpClient
} from '@angular/common/http';
import { Partner } from '../models/Partner';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class PartnerService extends BaseService{
  

  constructor(http:HttpClient) { 
    super(http, "partner");
  }

  // createPartner(partner:Partner){
  //     return lastValueFrom(this.http.post<Partner>('/api/createpartner', partner));
  // }

  // getPartner(id:number){
  //   return lastValueFrom(this.http.get<Partner>(`/api/partner/${id}`));
  // }

  // getAllPartners(){
  //   return lastValueFrom(this.http.get<Partner[]>('/api/partner'));
  // }

  // deletePartner(id:number){
  //   return lastValueFrom(this.http.delete(`/api/partner/${id}`));
  // }

  // updatePartner(partner:Partner):Promise<Partner>{
  //   return lastValueFrom(this.http.put<Partner>(`/api/partner/${partner.id}`, partner));
  // }

}
