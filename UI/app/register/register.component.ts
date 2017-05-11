import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    public ErrorMessages: string = '';

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                var errors = JSON.parse(error._body).modelState[""];
                if (errors) {
                    for (var index = 0; index < errors.length; index++) {
                        var element = errors[index];
                        console.log(element);
                        this.ErrorMessages+=element;
                    }
                }
                this.loading = false;
            });
    }
}