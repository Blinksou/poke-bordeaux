import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-pokemon-avatar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./pokemon-avatar.component.html",
  styleUrls: ["./pokemon-avatar.component.scss"]
})
export class PokemonAvatarComponent {
  @Input() url: string | null = null;
}
