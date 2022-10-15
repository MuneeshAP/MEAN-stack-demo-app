import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from '../../services/api.service';
import { ScrollingModule } from '@angular/cdk/scrolling'; 


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.css']
})

export class AddcardComponent implements OnInit {

  @Input() public myInputType: string ='';

  addcardForm !: FormGroup;
  bankName ='';
  cardNumber = '';
  cvv = '';
  expMonth ='';
  expYear = '';
  monthList = ['01','02','03','05','05','06','07','08','09','10','11','12'];
  yaerList = ['2022','2023','2024','2025','2026','2027','2028','2029','2030']
  isLoadingResults = false;
  errors : string = '';
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addcardForm = this.formBuilder.group({
      bankName : [null, Validators.required],
      cardNumber : [null, Validators.required],
      cvv : [null, Validators.required],
      expMonth : [null, Validators.required],
      expYear : [null, Validators.required]
    });
  }


  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addCards(this.addcardForm.value)
      .subscribe((res: any) => {
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
