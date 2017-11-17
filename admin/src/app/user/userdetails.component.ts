import { Component, ViewEncapsulation, NgModule, Pipe, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'user',
  templateUrl: './userdetails.component.html'
})

export class UserDetailsComponent implements OnInit{
  users: any[];
  usersId:number;
  constructor(private service:DataService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
  	  //Get Users
      this.route.params.subscribe((params: Params) => {
        this.usersId = params['id']; 
      });
       this.service.getSingleUser(this.usersId)
           //.subscribe(res => this.users = res );
       .subscribe(res => {
           this.users = res;
           this.users = Array.of(this.users); 
           console.log(this.users);
       },
       error => {
          console.log(error);
       }
    );
      
      //this.checkToken();
  }
  // ngDoCheck(){
  //     this.checkToken();
  // }
  // //Check Token Exsist or not
  // checkToken(){
  //   this.token = localStorage.getItem('token');
  //      if(!this.token){
  //        this.router.navigate(['./login']);
  //      }
  // }  


  


}
