import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header-logo",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./header-logo.component.html",
  styleUrls: ["./header-logo.component.scss"]
})
export class HeaderLogoComponent {
  @Input() isLoggedIn = false;
}
