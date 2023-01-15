import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  getPokemonFromId(id: string) {
    return this.http
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(map((response) => response as Pokemon));
  }
}
