import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptureActivity } from '../../../model/activity';

@Component({
  selector: 'app-capture-behaviour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './capture-behaviour.component.html',
})
export class CaptureBehaviourComponent {
  @Input() activity!: CaptureActivity;
}
