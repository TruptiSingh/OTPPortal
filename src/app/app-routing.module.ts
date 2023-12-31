import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAdministrationComponent } from './components/administrative-components/user-administration/user-administration.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { EditTutorProfileComponent } from './components/edit-tutor-profile/edit-tutor-profile.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateTutorComponent } from './components/create-tutor/create-tutor.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { UploadFilesAndImageComponent } from './components/upload-files-and-image/upload-files-and-image.component';
import { SearchTutorComponent } from './components/search-tutor/search-tutor.component';

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
    path: 'edit-tutor-profile',
    component: EditTutorProfileComponent,
    //canActivate: [AuthGuard]
  },

  {
    path: 'create-tutor',
    component: CreateTutorComponent,
    //canActivate: [AuthGuard]
  },

  {
    path: 'create-student',
    component: CreateStudentComponent,
    //canActivate: [AuthGuard]
  },

  {
    path: 'edit-student',
    component: EditStudentComponent,
    //canActivate: [AuthGuard]
  },

  {
    path: 'upload-files-image',
    component: UploadFilesAndImageComponent,
    //canActivate: [AuthGuard]
  },

  {
    path: 'search-tutor',
    component: SearchTutorComponent,
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
