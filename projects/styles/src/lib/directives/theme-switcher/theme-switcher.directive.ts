import { Directive, HostListener, inject, Input } from '@angular/core';
import { ThemeChoice } from './theme-switcher.interface';
import { ThemeService } from './theme-switcher.service';

@Directive({
  selector: '[appThemeSwitch]',
  standalone: true,
})
export class ThemeSwitchDirective {
  @Input('appThemeSwitch') theme!: ThemeChoice;

  readonly themeService = inject(ThemeService);

  @HostListener('click')
  onClick() {
    this.themeService.setTheme(this.theme);
  }
}
