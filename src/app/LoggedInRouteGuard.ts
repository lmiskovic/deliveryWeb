import { Injectable } from '@angular/core'
import { AuthService} from './auth.service'

import{
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Observer, Subject } from 'rxjs/Rx';

@Injectable()

export class LoggedInRouteGuardService implements CanActivate{

    public redirectUrl: string;

    constructor(private auth: AuthService, private router: Router){

    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.redirectUrl=state.url;
        return this.checkLogin(this.redirectUrl);
    }

    checkLogin(url: string): boolean{
        if(this.auth.isLoggedIn || localStorage.getItem('isLoggedIn') == 'true'){
            return true;
        }
        else{
            this.router.navigateByUrl['login'];
        }
    }
}