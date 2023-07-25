import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
