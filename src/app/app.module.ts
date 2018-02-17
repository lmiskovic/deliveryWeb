import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { RoutingConfig } from './app-routing';
import { AgmCoreModule } from '@agm/core';
import { AuthService } from './auth.service';

import { LoggedInRouteGuardService } from './LoggedInRouteGuard';

import { LoginComponent } from './components/login/login.component';
import { ManageComponent } from './components/manage/manage.component';
import { TrackComponent } from './components/track/track.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { GreetComponent } from './components/greet/greet.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManageComponent,
    TrackComponent,
    NavigationComponent,
    HomeComponent,
    LogoutComponent,
    GreetComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RoutingConfig,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC07fFBt2xrSODsnejXs76iQGEQTpokwHU'})
  ],
  providers: [AuthService, LoggedInRouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
