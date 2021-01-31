import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {FourOhFourComponent} from './fourohfour/fourohfour.component';
import {HomeComponent} from './home/home.component';
import {AuthLoginComponent} from './auth/auth-login/auth-login.component';
import {AuthRegisterComponent} from './auth/auth-register/auth-register.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './core/guards/auth.guard';
import {CreateBarterComponent} from './barter/create/create-barter.component';
import {MyBartersComponent} from './barter/my-barters/my-barters.component';
import {MyBarterComponent} from './barter/my-barter/my-barter.component';
import {SearchComponent} from './search/search.component';
import {UpdateEmailComponent} from './update-account/update-email/update-email.component';
import {UpdatePasswordComponent} from './update-account/update-password/update-password.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: AuthLoginComponent },
  { path: 'register', component: AuthRegisterComponent },
  { path: 'barter-form', component: CreateBarterComponent, canActivate: [AuthGuard] },
  { path: 'my-barters', component: MyBartersComponent, canActivate: [AuthGuard] },
  { path: 'barter-detail/:id', component: MyBarterComponent , canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'update-email', component: UpdateEmailComponent , canActivate: [AuthGuard]},
  { path: 'update-password', component: UpdatePasswordComponent , canActivate: [AuthGuard]},



  {path: '404', component: FourOhFourComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
