import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestPasswordResetComponent } from './components/password/request-password-reset/request-password-reset.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { SetNewPasswordComponent } from './components/password/set-new-password/set-new-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ BeforeLoginService ]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [ BeforeLoginService ]
  },
  {
    path: 'request-password-reset',
    component: RequestPasswordResetComponent,
    canActivate: [ BeforeLoginService ]
  },
  {
    path: 'set-new-password',
    component: SetNewPasswordComponent,
    canActivate: [ BeforeLoginService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AfterLoginService ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
