import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent, EqualValidator } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { AccessDeniedComponent } from './general/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { AdminHomeComponent } from './home/adminhome/index';
import { UserHomeComponent } from './home/userhome/index';
import { RegisterComponent } from './register/index';
import { ProductModule } from './product/product.module';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ProductModule,
        routing
    ],
    declarations: [
        AppComponent,
        EqualValidator,
        LoginComponent,
        HomeComponent,
        AdminHomeComponent,
        UserHomeComponent,
        RegisterComponent,
        AccessDeniedComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,

        // providers used to create fake backend
        // fakeBackendProvider,
        // MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }