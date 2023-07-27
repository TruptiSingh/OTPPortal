import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAdministrationComponent } from './components/administrative-components/user-administration/user-administration.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  {
    path: 'auth-callback',
    component: AuthCallbackComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'user-administration',
    component: UserAdministrationComponent,
    //canActivate: [AuthGuard],
    //data: { roles: [ "superuser" ] }
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
