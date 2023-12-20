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
  data!: any[];

  constructor(
    private dataService: DataService,
    private riot: RiotService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((result) => {
      this.data = result;
      console.log(this.data);
    });
  }
}