import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  endpoint: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Get all users from the API
 public async getUsers():Promise<User[]>{
  return new Promise((resolve, reject) => {
    this.http.get<User[]>(`${this.endpoint}/users`).subscribe((res: any) => {
      return resolve(res);
     })
    });
  };

}
