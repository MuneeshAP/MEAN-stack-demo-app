import { Component, OnDestroy, OnInit, Input, Output, EventEmitter,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { loginUser } from '../../model/loginuser';

import { ApiService } from '../../services/api.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  email = '';
  password = '';
  isLoadingResults = false;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  username : string = '';

  errors : string = '';

  @Output() usernameEvent = new EventEmitter<string>();

  constructor(private router: Router,private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : [null, Validators.required],
      password : [null, Validators.required]
    });

    if(localStorage.getItem('token') !== null){
      this.router.navigate(['home'])  
    }
  }

  

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.signIn(this.loginForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          localStorage.setItem('token',res.token);
          this.username  = res.user.username;
          localStorage.setItem('username',this.username);
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        }, (err: any) => {
          this.errors = err.error.error;
          setTimeout(()=>{
            this.errors = ''
          },3000)
          this.isLoadingResults = false;
        });
  }

  // reloadCurrentPage() {
  //   window.location.reload();
  //  }

}
