import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/index';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var grantAccess: boolean;
        if (this.auth.loggedIn()) {
            grantAccess = true;

            let roles = route.data["roles"] as Array<string>;
            if (roles) {
                var user = this.auth.getLocalUser();
                if (user && user.roles && user.roles.length > 0) {
                    for (var index = 0; index < roles.length; index++) {
                        var element = roles[index];
                        if (user.roles.indexOf(element) > -1)
                            return true;
                    }
                }
                this.router.navigate(['/accessdenied']);
                return false;
            } else {
                return true;
            }

        } else {
            // not logged in so redirect to login page
            this.router.navigate(['/login']);
            return false;
        }
    }
}