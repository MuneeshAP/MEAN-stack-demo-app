import { Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot  } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router,private api: ApiService) { }


  ngOnInit(): void { }

  canActivate (activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(localStorage.getItem('token') === '' ||
        localStorage.getItem('token') === null ||
          localStorage.getItem('token') === undefined  ){
            this.router.navigate(['/']);
            return false;
    }else{
      // console.log("this url",this.router.url);
      // if(this.router.url === '/home' || this.router.url === '/profile' || this.router.url === '/'){
      //   this.router.navigate(['home']);
      //   return true
      // }
      // if(this.router.url === '/'){
      //   this.router.navigate (['/home']);
      //   return true;
      // }
      return true
      
    }
  }
}
