import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router,ActivatedRoute,Params } from '@angular/router';

import { map } from 'rxjs'


import { Cards } from 'src/app/model/cards';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoadingResults = false;
  displayedColumns: string[] = ['bankName','cardNumber','cvv', 'expMonth','expYear'];
  data: Cards[] = [];


  constructor(private router: Router,private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCards()
    .subscribe((res: any) => {
      this.data = res.cards;
      this.isLoadingResults = false;
    }, (err : any) => {
      this.isLoadingResults = false;
    });
  }
  reloadCurrentPage() {
    window.location.reload();
   }


}
