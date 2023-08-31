import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { UserAdministrationComponent } from './components/administrative-components/user-administration/user-administration.component';
import { AuthService } from './services/authentication/auth.service';
import { AuthGuard } from './services/authentication/auth.guard.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbdSortableHeader } from './directives/sortable.directive';
import { UsersService } from './services/user-services/users.service';
import { UsersApiService } from './services/api-services/users-api/users-api.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditTutorProfileComponent } from './components/edit-tutor-profile/edit-tutor-profile.component';
import { CreateTutorComponent } from './components/create-tutor/create-tutor.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    AuthCallbackComponent,
    NgbdSortableHeader,
    UserAdministrationComponent,
    HomeComponent,
    ProfileComponent,
    EditTutorProfileComponent,
    CreateTutorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
