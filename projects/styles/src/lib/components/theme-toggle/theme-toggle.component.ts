import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ThemeService } from '../../directives/theme-switcher/theme-switcher.service';
import { ThemeChoice } from '../../directives/theme-switcher/theme-switcher.interface';
import { ThemeSwitchDirective } from '../../directives/theme-switcher/theme-switcher.directive';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  imports: [ThemeSwitchDirective],
  providers: [ThemeService],
})
export class ThemeToggleComponent implements OnInit {
  readonly themeService = inject(ThemeService);

  readonly choice = signal<ThemeChoice>('system');
  readonly choiceSwitch = effect(() => {
    this.choice.set(this.themeService.theme());
  });

  ngOnInit() {
    this.choice.set(this.themeService.theme());
  }
}
