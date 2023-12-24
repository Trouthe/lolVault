// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/data';

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  removeData(entryId: string): Observable<any> {
    const deleteUrl = this.apiUrl + '/' + entryId;
    return this.http.delete<any>(deleteUrl).pipe(
      catchError((error)=>{
        return throwError(error);
      })
    );
  }
}
