import { Injectable } from '@angular/core';
import { User } from '../models/User';

import { lastValueFrom, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  createPartner(){
    
  }
}
