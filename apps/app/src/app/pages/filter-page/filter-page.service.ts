import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonType } from '../../../interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class FilterPageService {
  constructor(private http: HttpClient) {}

  getTypes(url: string): Observable<PokemonType[]> {
    return this.http.get<PokemonType[]>(url, httpOptions);
  }
}
