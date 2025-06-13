import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@ui-kit';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
