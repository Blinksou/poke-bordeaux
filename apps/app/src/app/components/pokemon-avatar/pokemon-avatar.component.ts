import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { Pokemon } from "./model/pokemon";
import { MatGridListModule } from '@angular/material/grid-list';
import { userPokemon } from "../../model/userPokemon";
import { Observable } from "rxjs";
import { User, UserProfile } from "@angular/fire/auth";

@Component({
  selector: "app-pokemon-avatar",
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatButtonModule, MatBadgeModule, MatIconModule, MatGridListModule],
  templateUrl: "./pokemon-avatar.component.html",
  styleUrls: ["./pokemon-avatar.component.scss"]
})
export class PokemonAvatarComponent implements OnInit {
  @Input() pokemon: Pokemon | null = null;
  @Input() border!: string;
  @Input() user!: Observable<UserProfile | null>;
  @Input() userpokemons: UserProfile['pokemons'] | undefined;
  // @Input() quantity!: number;
  public test: userPokemon[] | undefined;

  ngOnInit() {
    console.log("border", this.border)
    console.log("user", this.user)
    console.log('pokemons', this.userpokemons)
    // this.user.subscribe(user => ));
  }
}
