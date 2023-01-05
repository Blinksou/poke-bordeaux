import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationItem as BottomNavigationItem } from './model/bottom-navigation-item';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-navigation-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-navigation-item.component.html',
  styleUrls: ['./bottom-navigation-item.component.scss'],
})
export class BottomNavigationItemComponent {
  @Input() item: BottomNavigationItem | null = null;

  constructor(private readonly router: Router) {}

  get iconPath(): string {
    console.log('this.router.url', this.router.url);
    return `assets/bottom-navigation${
      this.router.url === this.item?.path ? '/active' : ''
    }/${this.item?.icon}.svg`;
  }
}
