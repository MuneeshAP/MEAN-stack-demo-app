import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private api: ApiService) { }

  username : string ='';
  email : string ='';

  ngOnInit(): void {

    this.api.getuser().subscribe((res:any)=>{
      this.username = res.user.username;
      this.email = res.user.email;
    })  
    
  }
}
