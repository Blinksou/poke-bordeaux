import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationItem as BottomNavigationItem } from './model/bottom-navigation-item';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-navigation-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-navigation-item.component.html',
})
export class BottomNavigationItemComponent {
  @Input() item: BottomNavigationItem | null = null;

  constructor(private readonly router: Router) {}

  get iconPath(): string {
    return `assets/bottom-navigation${
      this.router.url === this.item?.path ? '/active' : ''
    }/${this.item?.icon}.svg`;
  }
}
