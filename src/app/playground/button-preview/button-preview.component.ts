import { Component, input } from '@angular/core';
import { ButtonConfig } from '../button-config';
import { ButtonComponent } from '@ui-kit';

@Component({
  selector: 'app-button-preview',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './button-preview.component.html',
  styleUrls: ['./button-preview.component.scss'],
})
export class ButtonPreviewComponent {
  readonly config = input.required<ButtonConfig>();
}
