import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/index';
import { UserService } from '../../_services/index';

@Component({
    moduleId:module.id,
    templateUrl:'adminhome.component.html'
})
export class AdminHomeComponent implements OnInit{
    UserName:string;
    users: User[] = [];

    constructor(private _userService:UserService)
    {
        
    }
    
    ngOnInit(){
        this.UserName=this._userService.getLocalUser().username;
        // get users from secure api end point
        this._userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }
}