import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { bottomNavigationIcons, BottomNavigationItems } from './icons';
import { BottomNavigationItemComponent } from './bottom-navigation-item/bottom-navigation-item.component';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [CommonModule, BottomNavigationItemComponent],
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss'],
})
export class BottomNavigationComponent {
  items: BottomNavigationItems = bottomNavigationIcons;

  constructor(private readonly router: Router) {}
}
