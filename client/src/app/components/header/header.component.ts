import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

import { MatMenuModule } from '@angular/material/menu'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,AfterViewInit{

  constructor(private router: Router,private api: ApiService){}

  // @ViewChild(LoginComponent) viewData = LoginComponent;

  title = 'Demo App';

  showMenu : Boolean = false;

  userToken : string | null ='';
  userName : string | null ='';


   initials!: string;
   circleColor!: string;
   showInitials = false;

    private colors = [
        '#EB7181', // red
        '#468547', // green
        '#FFD558', // yellow
        '#3670B2', // blue
    ];

  

  ngOnInit(){
    this.userToken = localStorage.getItem('token');
    this.userName = localStorage.getItem('username');

    if(this.userToken){
      this.showMenu = true;
      this.showInitials = true;
      this.createInititals();
      const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
      this.circleColor = this.colors[randomIndex];    }
   }

   private createInititals(): void {
    let initials = "";
    if(this.userName?.length !== 0){
      var splitted = this.userName?.charAt(0).toUpperCase(); 
    }
    this.initials = splitted!;
}

  ngAfterViewInit(): void {
    
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
