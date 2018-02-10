import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManageComponent } from './components/manage/manage.component';
import { TrackComponent } from './components/track/track.component';

const routes: Routes = [
    { path: "", component: LoginComponent},
    { path: "manage", component: ManageComponent},
    { path: "track", component: TrackComponent}
]

export const RoutingConfig = RouterModule.forRoot(routes)
