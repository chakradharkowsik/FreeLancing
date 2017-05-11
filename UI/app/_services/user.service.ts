import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './index';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    private baseAddress:string='http://localhost:59822/api';
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(this.baseAddress+'/accounts/users', options)
            .map((response: Response) => response.json());
    }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
 
    create(user: any) {
        
        return this.http.post(this.baseAddress+'/accounts/create', user, this.jwt()).map((response: Response) => response.json());
    }
 
    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }
 
    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
 
    // private helper methods
    public getLocalUser(){
       return this.authenticationService.getLocalUser();
    }
    IsUserInRole(role:string):boolean{
        return this.authenticationService.IsUserInRole(role);
    }
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token=localStorage.getItem('auth_token');
        if (currentUser && token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            return new RequestOptions({ headers: headers });
        }
    }
}