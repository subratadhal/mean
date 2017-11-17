import { Component, ViewEncapsulation, NgModule, Pipe, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'continentdetails',
  templateUrl: './continentdetails.component.html'
})

export class ContinentdetailsComponent implements OnInit{
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  description:string = '';
  name:string = '';
  titleAlert:string = 'This field is required';

  continents: any[];
  continentsID:number;

  constructor(private service:DataService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.rForm = fb.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'validate' : ''
    });
  }
  ngOnInit() {

    this.rForm.get('validate').valueChanges.subscribe(

      (validate) => {

          if (validate == '1') {
              this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
              this.titleAlert = 'You need to specify at least 3 characters';
          } else {
              this.rForm.get('name').setValidators(Validators.required);
          }
          this.rForm.get('name').updateValueAndValidity();

      });
  	  //Get Users
    //   this.route.params.subscribe((params: Params) => {
    //     this.continentsID = params['id']; 
    //   });
    //    this.service.getSingleUser(this.continentsID)
    //        //.subscribe(res => this.users = res );
    //    .subscribe(res => {
    //        this.continents = res;
    //        this.continents = Array.of(this.continents); 
    //        console.log(this.continents);
    //    },
    //    error => {
    //       console.log(error);
    //    }
    // );
  }
  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }


}
