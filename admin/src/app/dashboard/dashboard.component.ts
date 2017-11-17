import { Component, ViewEncapsulation, NgModule, Pipe, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  continents: any[];
  token: string;
  email: string;
  constructor(private service:DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(){
      this.checkToken();
  }

  ngDoCheck(){
      this.checkToken();
  }

  checkToken(){
    this.token = localStorage.getItem('token');
       if(!this.token){
         this.router.navigate(['./login']);
       }
  }  
}
