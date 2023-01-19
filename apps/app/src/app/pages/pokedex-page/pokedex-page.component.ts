import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { FilterPageComponent } from '../filter-page/filter-page.component';
import { PokemonAvatarComponent } from '../../components/pokemon-avatar/pokemon-avatar.component';
import { Pokemon } from '../../components/pokemon-avatar/model/pokemon';
import { PokemonType } from '../../components/pokemon-avatar/model/pokemon';
import PokemonList from '../../../assets/pokemon/pokemons-list.json';
import { UserProfile } from '../../model/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { userPokemon } from '../../model/userPokemon';

@Component({
  selector: 'app-pokedex-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    PokemonAvatarComponent,
    MatGridListModule,
  ],
  templateUrl: './pokedex-page.component.html',
  styleUrls: ['./pokedex-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokedexPageComponent implements OnInit {
  user$: Observable<UserProfile | null>;
  @Input() userpokemons: UserProfile['pokemons'] | undefined;


  constructor(public readonly dialog: MatDialog, private readonly userService: UserService) {
    this.user$ = userService.user$;
  }

  public border = "";
  filteredPokemons: Pokemon[] = [];
  selectedTypes: [] = [];
  finalValue: [] = [];
  // userPokemons: userPokemon[] = [];
  @Input() search: string | undefined;
  @Input() pokemons!: Pokemon[];

  selectedPokemon: Pokemon | null = null;

  setSelectedPokemon(p: Pokemon) {
    this.selectedPokemon = p;
  }

  unselectPokemon() {
    this.selectedPokemon = null;
  }

  ngOnInit() {
    this.pokemons = Object.values(PokemonList) as unknown as Pokemon[];
    this.user$.subscribe(async (user) => {
      if(user) {
        // this.userPokemons?.push(...user.pokemons)
        // console.log('this.userPokemons first', this.userPokemons)
        this.checkUserPokemon(user.pokemons)
      }
    })
  }


  checkUserPokemon(userPokemons: userPokemon[]) {
    if(userPokemons) {
      for (const pok of this.pokemons) {
        if (userPokemons.some(p => p.pokemonId === pok.id)) {
          console.log('owned')
          this.border = "owned"
          console.log('this.border', this.border)
        } else {
          this.border = "notowned"
        }
      }
    }
  }

  comparePokemons(allPokemons: Pokemon[], selectedTypes: PokemonType[]) {
    for (const pokemon of allPokemons) {
      for(const type of pokemon.types) {
        if (selectedTypes.some(t => t.name === type.name)) {
          this.filteredPokemons.push(pokemon);
        }
      }
    }
    return this.filteredPokemons
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterPageComponent, {
      width: '250px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { types: this.selectedTypes }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.finalValue = result.data;
      this.pokemons = this.comparePokemons(this.pokemons, this.finalValue);
      console.log('this.pokemons', this.pokemons)
    });
  }

  trackPokemonId(index: number, pokemon: Pokemon) {
    return pokemon.id;
  }
}
