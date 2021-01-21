import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import {HomeModule} from './home/home.module';
import {FourOhFourComponent} from './fourohfour/fourohfour.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthRegisterComponent} from './auth/auth-register/auth-register.component';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FourOhFourComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
