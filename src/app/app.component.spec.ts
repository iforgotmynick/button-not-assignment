import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ButtonComponent } from '@ui-kit';
import { ThemeToggleComponent } from '@styles';

describe('AppComponent', () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      (() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ButtonComponent, ThemeToggleComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
