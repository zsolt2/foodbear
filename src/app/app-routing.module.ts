import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourierComponent } from './components/add-courier/add-courier.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { AddPartnerComponent } from './components/add-partner/add-partner.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CourierDetailsComponent } from './components/courier-details/courier-details.component';
import { FoodDetailsComponent } from './components/food-details/food-details.component';
import { HelloComponent } from './components/hello/hello.component';
import { ListCouriersComponent } from './components/list-couriers/list-couriers.component';
import { ListFoodsComponent } from './components/list-foods/list-foods.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PartnerDetailsComponent } from './components/partner-details/partner-details.component';
import { PartnerListComponent } from './components/partner-list/partner-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full'},
  { path: 'login', component: LoginpageComponent},
  //{ path: '', component: LoginpageComponent }, 
  { path: 'hello', component: HelloComponent, canActivate: [AdminGuard] },
  { path: 'mainpage', component: MainPageComponent, canActivate: [AuthGuard], children: [
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'adduser', component: AddUserComponent, canActivate: [AdminGuard]},
    { path: 'listusers', component: ListUsersComponent, canActivate: [AdminGuard] },
    { path: 'addpartner', component: AddPartnerComponent, canActivate: [AdminGuard] },
    { path: 'partner/:id', component: PartnerDetailsComponent, canActivate: [AuthGuard] },
    { path: 'partners', component: PartnerListComponent, canActivate:[AuthGuard]},
    { path: 'addfood', component: AddFoodComponent, canActivate: [AdminGuard]},
    { path: 'addcourier', component: AddCourierComponent, canActivate: [AdminGuard]},
    { path: 'listfoods', component: ListFoodsComponent, canActivate: [AuthGuard]},
    { path: 'food/:id', component: FoodDetailsComponent, canActivate: [AuthGuard]},
    { path: 'listcouriers', component: ListCouriersComponent, canActivate: [AuthGuard]},
    { path: 'courier/:id', component: CourierDetailsComponent, canActivate: [AuthGuard]},
  ] },

  { path: '**', redirectTo: '/mainpage'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
