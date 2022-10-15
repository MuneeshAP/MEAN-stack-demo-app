import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlHandlingStrategy } from '@angular/router';

import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddcardComponent } from './components/addcard/addcard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

import { AuthService} from './services/auth.service';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
    // data : {title : "List of Cases"}
  },
  {
    path: 'signup',
    component: RegisterComponent
    // data : {title : "List of Cases"}
  },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate:[AuthService]
    // data : {title : "List of Cases"},
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[AuthService]
    // data : {title : "List of Cases"}
  },
  {
    path: 'addcard',
    component: AddcardComponent,
    canActivate:[AuthService]
    // data : {title : "List of Cases"}
  },
  {
    path: '**',
    component: NotfoundComponent
    // data : {title : "List of Cases"}
  },
  {
    path: '',
    redirectTo: '',
    pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
