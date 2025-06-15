import { Directive, HostListener, inject, input } from '@angular/core';
import { ThemeChoice } from './theme-switcher.interface';
import { ThemeService } from './theme-switcher.service';

@Directive({
  selector: '[appThemeSwitch]',
  standalone: true,
})
export class ThemeSwitchDirective {
  readonly theme = input.required<ThemeChoice>({ alias: 'appThemeSwitch' });

  readonly themeService = inject(ThemeService);

  @HostListener('click')
  onClick() {
    this.themeService.setTheme(this.theme());
  }
}
