import { Injectable, signal, computed, Signal, effect } from '@angular/core';
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

  constructor() {
    effect(() => {
      document.documentElement.setAttribute(
        'data-theme',
        this.effectiveTheme(),
      );
    });
  }

  setTheme(value: ThemeChoice) {
    this.theme.set(value);
    localStorage.setItem('theme', value);
  }
}
