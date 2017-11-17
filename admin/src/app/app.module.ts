import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Service
import { DataService } from './data.service';
//Component
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user/userdetails.component';
import { LoginComponent } from './login/login.component';

import { ContinentComponent } from './continent/continent.component';
import { ContinentdetailsComponent } from './continent/continentdetails.component';

export const routes = [
 { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
 { path: '',            component: AppComponent },
 { path: 'dashboard',   component: DashboardComponent },
 { path: 'users',       component: UserComponent },
 { path: 'users/:id',   component: UserDetailsComponent },
 { path: 'login',       component: LoginComponent },
 { path: 'continent',           component: ContinentComponent }
 { path: 'continent/:id',       component: ContinentdetailsComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    UserDetailsComponent,
    LoginComponent,
    ContinentComponent,
    ContinentdetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
