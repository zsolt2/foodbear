import { Injectable } from '@angular/core';
import { User } from '../models/User';

import { lastValueFrom, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

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
  signIn(user: User) {
    const loginUser$ = this.http.post<any>(`${this.endpoint}/login`, user).pipe(
      switchMap((res: any) => {
        localStorage.setItem('access_token', res.token);
        return this.getUserProfile();
      })
    );

    const saveCredentials$ = loginUser$.pipe(
      switchMap((userProfile: any) => {
        this.currentUser = userProfile;
        return of(userProfile);
      })
    );

    return saveCredentials$;
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

  async getCurrentUser(): Promise<User> {
      if( this.currentUser == null ){
        this.currentUser = await lastValueFrom(this.http.get<User>(`${this.endpoint}/user`)); 
      } 
      return this.currentUser;
  }
  
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(): Observable<User> {
    let api = `${this.endpoint}/user`;
    return this.http.get<User>(api, { headers: this.headers }).pipe(
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