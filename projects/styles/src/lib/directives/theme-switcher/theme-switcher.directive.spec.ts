import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSwitchDirective } from './theme-switcher.directive';
import { ThemeService } from './theme-switcher.service';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <button data-testid="button" [appThemeSwitch]="'dark'">Dark</button>
  `,
  standalone: true,
  imports: [ThemeSwitchDirective],
})
class TestHostComponent {}

describe('ThemeSwitchDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  const themeServiceMock = {
    setTheme: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent, ThemeSwitchDirective],
      providers: [{ provide: ThemeService, useValue: themeServiceMock }],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should call setTheme on click', () => {
    const btnEl = fixture.debugElement.query(
      By.css('[data-testid="button"]'),
    )?.nativeElement;
    fixture.detectChanges();

    expect(btnEl).toBeTruthy();

    btnEl.click();
    expect(themeServiceMock.setTheme).toHaveBeenCalledWith('dark');
  });
});
