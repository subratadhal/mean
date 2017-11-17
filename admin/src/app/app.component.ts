import { Component, ViewEncapsulation, NgModule, Pipe, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    token: string;
    title: string;
    email: string; 
    activeUserID: string;
    constructor(private service:DataService, private route: ActivatedRoute, private router: Router) {
    }
    ngOnInit(){
    	this.checkToken();
    }

    ngDoCheck(){
  		this.checkToken();
    }
	clearToken(){
	  	//localStorage.removeItem('token');
      localStorage.clear();
	  	this.router.navigate(['./login']);
	  }
	checkToken(){
		this.token = localStorage.getItem('token');
	     if(this.token){
	     	this.email = localStorage.getItem('email');
        this.activeUserID = localStorage.getItem('id');
	     }else{
	     	this.email = "";
	     }
	}


}
