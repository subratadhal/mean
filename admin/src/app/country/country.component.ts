import { Component, ViewEncapsulation, NgModule, Pipe, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'country',
  templateUrl: './country.component.html'
})

export class CountryComponent implements OnInit{
  countries: any;
  token: any;
  constructor(private service:DataService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
  	  //Get Country
      this.service.getCountry()
      .subscribe(res =>this.countries = res );
      
      this.checkToken();
  }
  ngDoCheck(){
      this.checkToken();
  }
  //Check Token Exsist or not
  checkToken(){
    this.token = localStorage.getItem('token');
       if(!this.token){
         this.router.navigate(['./login']);
       }
  }  


  


}
