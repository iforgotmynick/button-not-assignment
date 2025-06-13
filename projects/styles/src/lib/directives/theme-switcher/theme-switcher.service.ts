import { Injectable, signal, computed, Signal } from '@angular/core';
import { ThemeChoice } from './theme-switcher.interface';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<ThemeChoice>(
    (localStorage.getItem('theme') as ThemeChoice) ?? 'system',
  );

  readonly effectiveTheme: Signal<'light' | 'dark'> = computed(() => {
    const theme: ThemeChoice = this.theme();
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    return theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
  });

  setTheme(value: ThemeChoice) {
    this.theme.set(value);
    document.documentElement.setAttribute('data-theme', this.effectiveTheme());
    localStorage.setItem('theme', value);
  }
}
