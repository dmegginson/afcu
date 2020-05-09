import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { CurrentUserResolve } from './resolves/current-user-resolve';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    SignupComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'signup', component: SignupComponent },
      { path: 'landing/:id', component: LandingComponent, runGuardsAndResolvers: "always", resolve: { currentUser: CurrentUserResolve } }
    ])
  ],
  providers: [
    CurrentUserResolve
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
