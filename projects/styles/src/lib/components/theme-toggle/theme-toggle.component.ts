// Source: https://codesandbox.io/p/sandbox/tri-state-toggle-8vdcp
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../directives/theme-switcher/theme-switcher.service';
import { ThemeSwitchDirective } from '../../directives/theme-switcher/theme-switcher.directive';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  imports: [ThemeSwitchDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
  readonly choice = this.themeService.theme;
}
