import { Routes, RouterModule } from '@angular/router';

import { LoggedInRouteGuardService } from './LoggedInRouteGuard';

import { LoginComponent } from './components/login/login.component';
import { ManageComponent } from './components/manage/manage.component';
import { TrackComponent } from './components/track/track.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { GreetComponent } from './components/greet/greet.component';


const routes: Routes = [
    { path: "login", component: LoginComponent},
    { path: "", component: HomeComponent},
    { path: "home", component: HomeComponent, canActivate: [LoggedInRouteGuardService]},
    { path: "manage", component: ManageComponent, canActivate: [LoggedInRouteGuardService]},
    { path: "track", component: TrackComponent, canActivate: [LoggedInRouteGuardService]},
    { path: "logout", component: LogoutComponent, canActivate: [LoggedInRouteGuardService]},
    { path: "greet", component: GreetComponent}
]

export const RoutingConfig = RouterModule.forRoot(routes)
