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

import { CountryComponent } from './country/country.component';
import { CountrydetailsComponent } from './country/countrydetails.component';

import { StateComponent } from './state/state.component';
import { StatedetailsComponent } from './state/statedetails.component';
import { AddStateComponent } from './state/addstate.component';

export const routes = [
 { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
 { path: '',            component: AppComponent },
 { path: 'dashboard',   component: DashboardComponent },
 { path: 'users',       component: UserComponent },
 { path: 'users/:id',   component: UserDetailsComponent },
 { path: 'login',       component: LoginComponent },
 { path: 'continent',           component: ContinentComponent },
 { path: 'continent/:id',       component: ContinentdetailsComponent },
 { path: 'country',             component: CountryComponent },
 { path: 'country/:id',         component: CountrydetailsComponent },
 { path: 'state',             component: StateComponent },
 { path: 'state/:id',         component: StatedetailsComponent },
 { path: 'newstate',          component: AddStateComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    UserDetailsComponent,
    LoginComponent,
    ContinentComponent,
    ContinentdetailsComponent,
    CountryComponent,
    CountrydetailsComponent,
    StateComponent,
    StatedetailsComponent,
    AddStateComponent
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
//https://coursetro.com/posts/code/59/Angular-4-Event-Binding
//https://coursetro.com/courses/19/Learn-Angular-5-from-Scratch---Angular-5-Tutorial?utm_source=in_article&utm_campaign=article&utm_medium=Learn+Angular+5+from+Scra