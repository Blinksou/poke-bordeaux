import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { en } from '../../translations/en';
import { fr } from '../../translations/fr';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';

  constructor(private readonly translate: TranslateService) {
    translate.setTranslation('en', en);
    translate.setTranslation('fr', fr);

    translate.setDefaultLang('fr'); // Fallback language
  }
}
