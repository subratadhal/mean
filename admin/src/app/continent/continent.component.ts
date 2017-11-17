import { Component, ViewEncapsulation, NgModule, Pipe, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'continent',
  templateUrl: './continent.component.html'
})

export class ContinentComponent implements OnInit{
  continents: any;
  token: any;
  constructor(private service:DataService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
  	  //Get Users
      this.service.getContinent()
      .subscribe(res =>this.continents = res );
      
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
