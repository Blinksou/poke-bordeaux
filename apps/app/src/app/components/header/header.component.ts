import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeaderLogoComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  subtitle: string | null = null;

  constructor(
    private readonly router: Router,
    public readonly authService: AuthService,
    private readonly translate: TranslateService
  ) {
    router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => {
        this.handleSubtitleChanges(event.urlAfterRedirects);
      });
  }

  handleSubtitleChanges(url: string) {
    if (url === '/') {
      this.subtitle = 'Gotta catch them all!';
    } else {
      this.subtitle = null;
    }
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
