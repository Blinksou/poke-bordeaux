import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {  UserProfile } from "@angular/fire/auth";

/** MATERIAL */
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

/** MODELS */
import { userPokemon } from "../../model/userPokemon";

/** RXJS */
import { Observable } from "rxjs";

/** SERVICES */
import { PokedexPokemon } from "../../pages/pokedex-page/pokedex.service";

@Component({
  selector: "app-pokemon-avatar",
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatButtonModule, MatBadgeModule, MatIconModule, MatGridListModule],
  templateUrl: "./pokemon-avatar.component.html",
  styleUrls: ["./pokemon-avatar.component.scss"]
})
export class PokemonAvatarComponent implements OnInit {
  @Input() pokemon: PokedexPokemon | null = null;
  @Input() border!: string;
  @Input() user!: Observable<UserProfile | null>;
  @Input() userpokemons: UserProfile['pokemons'] | undefined;
  public test: userPokemon[] | undefined;

  ngOnInit() {
    console.log('this.pokemon', this.pokemon);
  }
}
