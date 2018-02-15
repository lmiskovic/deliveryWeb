import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManageComponent } from './components/manage/manage.component';
import { TrackComponent } from './components/track/track.component';
import { LoggedInRouteGuardService } from './LoggedInRouteGuard';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { GreetComponent } from './greet/greet.component';

const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "greet", component: GreetComponent},
    { path: "home", component: HomeComponent, canActivate: [LoggedInRouteGuardService]},
    { path: "login", component: LoginComponent},
    { path: "logout", component: LogoutComponent, canActivate: [LoggedInRouteGuardService]},
    { path: "manage", component: ManageComponent, canActivate: [LoggedInRouteGuardService]},
    { path: "track", component: TrackComponent, canActivate: [LoggedInRouteGuardService]}
]

export const RoutingConfig = RouterModule.forRoot(routes)
