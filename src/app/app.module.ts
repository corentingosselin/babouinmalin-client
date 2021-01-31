import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import {FourOhFourComponent} from './fourohfour/fourohfour.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthRegisterComponent} from './auth/auth-register/auth-register.component';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { CreateBarterComponent } from './barter/create/create-barter.component';
import {HomeComponent} from './home/home.component';
import { MyBartersComponent } from './barter/my-barters/my-barters.component';
import { MyBarterComponent } from './barter/my-barter/my-barter.component';
import {authInterceptorProviders} from './core/interceptors/auth.interceptor';
import { SearchComponent } from './search/search.component';
import { UpdatePasswordComponent } from './update-account/update-password/update-password.component';
import { UpdateEmailComponent } from './update-account/update-email/update-email.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FourOhFourComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    ProfileComponent,
    HomeComponent,
    MyBartersComponent,
    CreateBarterComponent,
    CreateBarterComponent,
    MyBartersComponent,
    MyBarterComponent,
    SearchComponent,
    UpdatePasswordComponent,
    UpdateEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
     authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
