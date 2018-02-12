import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManageComponent } from './components/manage/manage.component';
import { TrackComponent } from './components/track/track.component';
import { LoggedInRouteGuardService } from './LoggedInRouteGuard';

const routes: Routes = [
    { path: "", component: LoginComponent},
    { path: "login", component: LoginComponent},
    { path: "manage", component: ManageComponent, canActivate: [LoggedInRouteGuardService]},
    { path: "track", component: TrackComponent, canActivate: [LoggedInRouteGuardService]}
]

export const RoutingConfig = RouterModule.forRoot(routes)
