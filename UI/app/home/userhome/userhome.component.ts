import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/index';

@Component({
    moduleId:module.id,
    templateUrl:'userhome.component.html'
})
export class UserHomeComponent implements OnInit{

    UserName:string;

    constructor(private _userService:UserService){

    }

    ngOnInit(){
        this.UserName=this._userService.getLocalUser().username;
    }

}