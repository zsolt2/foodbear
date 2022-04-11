import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginpageComponent },
  //{ path: '', component: LoginpageComponent },
  {
    path: 'users',
    component: ListUsersComponent,
    canActivate: [AuthGuard],
  },
  { path: 'hello', component: HelloComponent },
  { path: 'mainpage', component: MainPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
