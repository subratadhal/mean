import { Component, ViewEncapsulation, NgModule, Pipe, Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
@Injectable()
export class LoginComponent implements OnInit{
  users: any;
  loginForm: FormGroup;
  token: any;
  //email: any;
  

  constructor(private fb: FormBuilder, private service:DataService, private route: ActivatedRoute,  private router: Router) {
  	this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ''
    });
  }

//JSON.stringify(obj);
  onSubmit() {
 
  	let obj={
      email : this.loginForm.value.email,
      password  : this.loginForm.value.password
    };
    //this.email = this.loginForm.value.email;

    this.service.postAuth( JSON.stringify(obj) )
    .subscribe(res =>{ this.returnAuth(this.token = res) });   
 
  }
 private returnAuth(res)
    {
        if(res.success == false){
          //this.loginForm.reset();
          alert(res.message);
        }else{
           localStorage.setItem('token', res.token);
           localStorage.setItem('email', res.user.email);
           localStorage.setItem('id', res.user._id );
           localStorage.setItem('role', res.user.role );
           this.router.navigate(['./dashboard']);
        }
    }

}