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

  beforeEach(() => {
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

    localStorage.setItem('theme', 'system');

    service = new ThemeService();
  });

  it('should default to "system" theme if nothing is in localStorage', () => {
    const service = new ThemeService();

    expect(service.theme()).toBe('system');
  });

  it('should read saved theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    const newInstance = new ThemeService();
    expect(newInstance.theme()).toBe('dark');
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
