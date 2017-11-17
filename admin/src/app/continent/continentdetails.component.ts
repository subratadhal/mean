import { Component, ViewEncapsulation, NgModule, Pipe, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'continentdetails',
  templateUrl: './continentdetails.component.html'
})

export class ContinentdetailsComponent implements OnInit{
  continents: any[];
  continentsID:number;
  constructor(private service:DataService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
  	  //Get Users
      this.route.params.subscribe((params: Params) => {
        this.continentsID = params['id']; 
      });
       this.service.getSingleUser(this.continentsID)
           //.subscribe(res => this.users = res );
       .subscribe(res => {
           this.continents = res;
           this.continents = Array.of(this.continents); 
           console.log(this.continents);
       },
       error => {
          console.log(error);
       }
    );
      
      
  }
 


}
