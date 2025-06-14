import { Injector, runInInjectionContext, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme-switcher.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  const store: Record<string, string> = {};

  const mockLocalStorage = {
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      for (const key in store) {
        delete store[key];
      }
    },
  };

  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });

  beforeEach(() => {
    localStorage.setItem(
      'theme',
      mockLocalStorage.getItem('theme') || 'system',
    );
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });

    const injector = TestBed.inject(Injector);
    runInInjectionContext(injector, () => {
      service = inject(ThemeService);
    });
  });

  it('should default to "system" theme if nothing is in localStorage', () => {
    expect(service.theme()).toBe('system');
  });

  it('should set and persist the theme', () => {
    service.setTheme('light');
    expect(service.theme()).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should compute effective theme = dark when system prefers dark', () => {
    jest.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '',
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    });

    service.setTheme('system');
    expect(service.effectiveTheme()).toBe('dark');
  });

  it('should compute effective theme = light when user sets it directly', () => {
    service.setTheme('light');
    expect(service.effectiveTheme()).toBe('light');
  });
});
