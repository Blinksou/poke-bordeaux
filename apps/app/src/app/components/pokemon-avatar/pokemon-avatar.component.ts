import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: "app-pokemon-avatar",
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatButtonModule, MatBadgeModule, MatIconModule],
  templateUrl: "./pokemon-avatar.component.html",
  styleUrls: ["./pokemon-avatar.component.scss"]
})
export class PokemonAvatarComponent {
  @Input() url: string | null = null;
  @Input() border!: string;
  @Input() quantity!: number;
}
