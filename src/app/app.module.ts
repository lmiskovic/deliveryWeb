import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ManageComponent } from './components/manage/manage.component';
import { TrackComponent } from './components/track/track.component';
import { RoutingConfig } from './app-routing';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManageComponent,
    TrackComponent,
    NavigationComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RoutingConfig
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
