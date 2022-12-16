import { RouterModule } from "@angular/router";
import { Component } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
}
