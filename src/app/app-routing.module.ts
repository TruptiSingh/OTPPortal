import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAdministrationComponent } from './components/administrative-components/user-administration/user-administration.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './services/authentication/auth.guard.service';

const routes: Routes = [

  {
    path: 'auth-callback',
    component: AuthCallbackComponent,
  },
  {
    path: 'user-administration',
    component: UserAdministrationComponent,
    //canActivate: [AuthGuard],
    //data: { roles: [ "superuser" ] }
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
