import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index'
import { HomeComponent } from './home/index';
import { UserHomeComponent } from './home/userhome/index';
import { AdminHomeComponent } from './home/adminhome/index';
import { AccessDeniedComponent } from './general/index'
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'adminhome', component: AdminHomeComponent, canActivate: [AuthGuard],data:{roles:['Admin']} },
    { path: 'userhome', component: UserHomeComponent, canActivate: [AuthGuard],data:{roles:['User']} },
    { path: 'accessdenied', component: AccessDeniedComponent},
    { path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);