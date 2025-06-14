import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeToggleComponent } from '@styles';
import { ButtonComponent } from '@ui-kit';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent, ThemeToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
