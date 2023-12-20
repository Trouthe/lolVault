import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiotService {
  // Local
  private champFileUrl = "../../assets/imp/champions.json";

  constructor(private http: HttpClient) { }
  
  // getRiot(): Observable<any[]> {
    
  // }

  getChampions(): Observable<any[]> {
    return this.http.get<any[]>(this.champFileUrl);
  }
}
