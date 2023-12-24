import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RiotService {
  private name_api = '/lol/summoner/v4/summoners/by-name/';
  private uuid_api = '/lol/summoner/v4/summoners/by-puuid/';
  private find_uuid_api = '/riot/account/v1/accounts/by-riot-id/';
  private ranked_api = '/lol/league/v4/entries/by-summoner/';

  constructor(private http: HttpClient) { }

  getData(server: string, name: string, tag?: string): Observable<any[]> {
    const headers = new HttpHeaders().set('X-Riot-Token', environment.api);
    
    let apiUrl: string;

    if (tag === undefined) {
      apiUrl = server === 'euw1' ? '/api/europe' : '/api/americas';
      tag = server;
    } else {
      apiUrl = server === 'euw1' ? '/api/europe' : '/api/americas';
      // Use tag or server if tag is undefined
      tag = tag || server;
    }

    // Return an observable composed using switchMap
    return this.http.get(apiUrl + this.find_uuid_api + name + "/" + tag, { headers }).pipe(
      switchMap((result: any) => {
        // Use result.puuid to make another request
        return this.http.get<any[]>('/api/' + server + this.uuid_api + result.puuid, { headers });
      })
    );
  }

  getRanked(server: string, puuid: string): Observable<any[]> {
    const headers = new HttpHeaders().set('X-Riot-Token', environment.api);
    return this.http.get<any[]>('/api/' + server + this.ranked_api + puuid, { headers });
  } 
}
