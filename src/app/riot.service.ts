import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiotService {
  private dataapi = '/lol/summoner/v4/summoners/by-name/';

  constructor(private http: HttpClient) { }

  getData(server: string, name: string) {
    const headers = new HttpHeaders().set('X-Riot-Token', environment.api);

    let _result;
    this.http.get('/api/' + server + this.dataapi + name, { headers }).subscribe(result => {
      _result = result;
      console.log(_result)
    });
  } 
}