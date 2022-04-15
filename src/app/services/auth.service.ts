import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { lastValueFrom, Observable, Subscription, throwError } from 'rxjs';
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
  b!:boolean;

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/createuser`;
    console.log(user);
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: User){
    return this.http
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.getUserProfile().subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['mainpage']);
        });
      }, (err) => {
        throwError(err);
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
  public isAdmin(){
    return lastValueFrom(this.http.get<boolean>(`${this.endpoint}/user/isadmin`)).catch(err => {return false });
    // return new Promise((resolve, reject) => {
    //   this.http.get<boolean>(`${this.endpoint}/user/isadmin`).subscribe((res:any)=>{ 
    //     return resolve(res.isAdmin);   
    //   }, (err)=>{
    //     return resolve(false);
    //   });
    // });
  }

  getCurrentUser(): Promise<User> {
      return lastValueFrom(this.http.get<User>(`${this.endpoint}/user`));
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
      
      catchError(this.handleError)
    );
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
    console.log(msg);
    return throwError(msg);
  }

  addUser(user: User){
    console.log("hello")
    console.log(user);
    return lastValueFrom(this.http.post(`${this.endpoint}/createuser`, user ));
  }

  deleteUser(id: number) {
    this.http.delete(`${this.endpoint}/users/${id}`).subscribe((res) => {}, (err) => {
      alert("You can not delete your own profile.\nContact your admin to delete yor profile");
      throwError(err);
    });
  }

}