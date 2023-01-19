import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonTypeFilter } from '../../../interfaces';

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

  getTypes(url: string): Observable<PokemonTypeFilter[]> {
    return this.http.get<PokemonTypeFilter[]>(url, httpOptions);
  }
}
