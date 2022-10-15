import { Component } from '@angular/core';

import { ApiService } from '../app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  

  constructor(private router: Router,private api: ApiService){}
  title = 'Demo App';

  ngOnInit(){
    
  }


}
