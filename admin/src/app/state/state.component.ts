import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, Directive, Input, Output, EventEmitter, HostListener  } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'state',
  templateUrl: './state.component.html'
})

export class StateComponent implements OnInit{
  states: any;
  delstates: any;
  stateID: any;
  stateTitle: any;
  token: any;
  successMessage1: any;
  errorMessage1: any;
  constructor(private service:DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  	  this.service.getState().subscribe(res =>this.states = res );
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
  setStateID(sId:any,sName:any){
    this.stateID = sId;
    this.stateTitle = sName;
  }
  deleteState(){
    
    this.service.deleteState(this.stateID)
      .subscribe(res => {this.resultDeleteState(this.delstates = res)});  
  }
  private resultDeleteState(res)
    {
        if(res.success == false){
          this.errorMessage1 = res.message;
        }else{
          this.successMessage1 = res.message;
        }
        var interval = setTimeout(() => {
          this.successMessage1 = '';
          this.errorMessage1 = '';
          window.location.reload();
        }, 3000);
    }
  


}
