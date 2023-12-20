import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { RiotService } from '../riot.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit {
  mdb_data?: any[];
  data?: any[] = [];

  constructor(
    private dataService: DataService,
    private riot: RiotService,
    private http: HttpClient
  ) { }

  ngOnInit(){
    this.dataService.getData().subscribe((result) => {
      this.mdb_data = result;
      console.log(this.mdb_data);
      
      this.getInfo();
    });
  }

  getInfo(): void {
    for (let i=0; i < this.mdb_data!.length; i++) {
      console.log(this.mdb_data![i].public.server, this.mdb_data![i].public.name, this.mdb_data![i]?.public.tag)
      
      this.riot.getData(this.mdb_data![i].public.server, this.mdb_data![i].public.name, this.mdb_data![i]?.public.tag)
      .subscribe((result: any) => {
        this.data![i] = result;
      });
    }
    console.log(this.data);
  }
}