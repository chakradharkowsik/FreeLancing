import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
   
    constructor(private router: Router, private userService: UserService) { }

    ngOnInit() {
        if (this.userService.IsUserInRole('Admin')) {
            this.router.navigate(['/adminhome']);
        } else {
            this.router.navigate(['/userhome']);
        }        
    }

}