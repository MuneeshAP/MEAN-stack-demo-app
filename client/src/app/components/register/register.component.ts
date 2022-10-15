import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from '../../services/api.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm !: FormGroup;
  username ='';
  email = '';
  password = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  errors : string = '';

  constructor(private router: Router,private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username : [null, Validators.required],
      email : [null, Validators.required],
      password : [null, Validators.required]
    });

    if(localStorage.getItem('token') !== null){
      this.router.navigate(['home'])  
    }
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.register(this.registerForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          localStorage.setItem('token',res.token);
          this.username  = res.user.username;
          localStorage.setItem('username',this.username);
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
          // this.reloadCurrentPage();
          // this.router.navigate(['/home',{name:this.username}]);
        }, (err: any) => {
          this.errors = err.error.error;
          setTimeout(()=>{
            this.errors = ''
          },3000)
          this.isLoadingResults = false;
        });
  }

}
