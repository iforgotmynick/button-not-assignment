import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeToggleComponent } from '@styles';
import { PlaygroundComponent } from './playground/playground.component';

@Component({
  selector: 'app-root',
  imports: [ThemeToggleComponent, PlaygroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
