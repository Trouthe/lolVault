import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { RiotService } from '../riot.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit {
  mdb_data?: any[];
  data?: any[] = [];
  rankedInfo?: any[] = [];

  constructor(
    private dataService: DataService,
    private riot: RiotService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
      
  }

  ngAfterViewInit() {
    this.dataService.getData().subscribe((result) => {
      this.mdb_data = result;
      // console.log(this.mdb_data);
  
      this.getInfo();
    });
  }
  
  getInfo(): void {
    for (let i = 0; i < this.mdb_data!.length; i++) {
      this.riot.getData(this.mdb_data![i].public.server, this.mdb_data![i].public.name, this.mdb_data![i]?.public.tag)
        .pipe(
          map((result: any) => {
            this.data![i] = result;

            this.getRankedInfo(this.data![i]?.id, this.mdb_data![i].public.server)
              .subscribe((rankedInfoResult) => {
                if (rankedInfoResult![0]?.queueType == 'RANKED_SOLO_5x5'){
                  this.rankedInfo![i] = rankedInfoResult[0];
                }
                
                // console.log(this.data![i]?.id, this.rankedInfo!);
            });
            // console.log(this.rankedInfo)
          })
        )
        .subscribe();
    }
  }
  
  getRankedInfo(puuid: string, server: string): Observable<any> {
    return this.riot.getRanked(server, puuid).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  removeEntry(entryId: string, index: number) {
    this.dataService.removeData(entryId).subscribe(
      () => {
        this.mdb_data?.splice(index, 1);
      },
      error => {
        console.error('Error removing entry:', error);
      }
    );
  }
}