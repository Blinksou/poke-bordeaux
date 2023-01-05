import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokeApi } from '../../../interfaces';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class FilterPageService {

  constructor(private http: HttpClient) {}

  getTypes(url: string): Observable<PokeApi> {
    return this.http.get<PokeApi>(url, httpOptions);
  }
}
