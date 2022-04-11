import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { HelloComponent } from './components/hello/hello.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginpageComponent},
  //{ path: '', component: LoginpageComponent },
  {
    path: 'users',
    component: ListUsersComponent,
    canActivate: [AuthGuard],
  },
  { path: 'hello', component: HelloComponent, canActivate: [AdminGuard] },
  { path: 'mainpage', component: MainPageComponent, canActivate: [AuthGuard], children: [
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path:'adduser', component: AddUserComponent, canActivate: [AdminGuard]},
    { path: 'listusers', component: ListUsersComponent, canActivate: [AdminGuard] },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
