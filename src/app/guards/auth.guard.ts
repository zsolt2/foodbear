import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AuthGuard#canActivate called');
    return this.authService.isLoggedIn().then((res) => {
      console.log('AuthGuard#canActivate called2 ');
      console.log(res);
      if (res) {
        return true;
      } else {
        window.alert('Access not allowed!');
        this.router.navigate(['login']);
        return false;
      }
    });
  }
}
