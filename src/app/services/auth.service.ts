import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  
  endpoint: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser!:User;

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/createuser`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.getUserProfile().subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['mainpage']);
        }, (err) => {
          console.log('belso hiba');
        });
      }, (err) => {
        return null;
      });
  }

  getCurrentUserID(){
    return this.currentUser.id;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  public isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const token = localStorage.getItem('access_token');
      this.http.get<boolean>(`${this.endpoint}/token`).subscribe((res:any)=>{
        //console.log(res)
        resolve(res);
      }, (err) => {
        resolve(false);
      });
    });
  }

  //request if the authenticated user is admin
  public async isAdmin(){
    return new Promise((resolve, reject) => {
      this.http.get<boolean>(`${this.endpoint}/user/isadmin`).subscribe((res:any)=>{ 
        return resolve(res.isAdmin);   
      }, (err)=>{
        return resolve(false);
      });
    });
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(): Observable<any> {
    let api = `${this.endpoint}/user`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      
      //catchError(this.handleError)
    );
  }

  getCurrentUser():User{
    return this.currentUser;
  }

  // Error
  handleError(error: HttpErrorResponse) {
    console.log('error handler')
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}