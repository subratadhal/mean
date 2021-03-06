import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, Directive, Input, Output, EventEmitter, HostListener  } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'district',
  templateUrl: './district.component.html'
})

export class DistrictComponent implements OnInit{
  districts: any;
  deldistrict: any;
  districtID: any;
  districtTitle: any;
  token: any;
  successMessage1: any;
  errorMessage1: any;
  constructor(private service:DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  	  this.service.getDistrict().subscribe(res =>this.districts = res );
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
  setDistrictID(sId:any,sName:any){
    this.districtID = sId;
    this.districtTitle = sName;
  }
  deleteDistrict(){
    
    this.service.deleteDistrict(this.districtID)
      .subscribe(res => {this.resultDeleteDistrict(this.deldistrict = res)});  
  }
  private resultDeleteDistrict(res)
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
