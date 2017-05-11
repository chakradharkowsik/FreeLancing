import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
    public token: string;
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = localStorage.getItem('auth_token');
    }

    login(username: string, password: string): Observable<boolean> {
        let url = "http://localhost:59822/oauth/token";
        let body = "username=" + username + "&password=" + password + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().access_token;
                debugger;
                if (token) {
                    // set token property
                    this.token = token;
                    var userData = this.jwtHelper.decodeToken(token);
                    console.log(
                        this.jwtHelper.decodeToken(token),
                        this.jwtHelper.getTokenExpirationDate(token),
                        this.jwtHelper.isTokenExpired(token)
                    );
                    localStorage.setItem('auth_token', token);
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, roles: userData.role }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    loggedIn(): boolean {
        return tokenNotExpired('auth_token');
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('currentUser');
    }

    getLocalUser() {
        if (this.loggedIn()) {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            return currentUser;
        }
        else { return null; }
    }
    IsUserInRole(role: string): boolean {
        var curUser = this.getLocalUser();
        if (curUser && curUser.roles && curUser.roles.length > 0) {
            return curUser.roles.indexOf(role) > -1;
        }
        else {
            return false;
        }
    }
}