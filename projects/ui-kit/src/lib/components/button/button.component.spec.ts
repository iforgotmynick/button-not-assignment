import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  const getButton = (): HTMLButtonElement | undefined =>
    fixture.debugElement.query(By.css('[data-testid="button"]'))?.nativeElement;
  const getLink = (): HTMLAnchorElement | undefined =>
    fixture.debugElement.query(By.css('[data-testid="button-link"]'))
      ?.nativeElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => jest.clearAllMocks());

  it('should render as <button> when href is not provided', () => {
    fixture.componentRef.setInput('href', undefined);
    fixture.detectChanges();

    expect(getButton()).toBeTruthy();
    expect(getLink()).toBeFalsy();
  });

  it('should render as <a> when href is provided', () => {
    fixture.componentRef.setInput('href', '/some-link');
    fixture.detectChanges();

    const linkEl = getLink();
    expect(linkEl).toBeTruthy();
    expect(linkEl?.getAttribute('href')).toBe('/some-link');
  });

  it('should apply correct variant and size classes', () => {
    fixture.componentRef.setInput('type', 'secondary');
    fixture.componentRef.setInput('size', 'large');
    fixture.detectChanges();

    const btnEl = getButton();
    expect(btnEl).toBeTruthy();
    const classList = btnEl!.classList;
    expect(classList).toContain('btn--secondary');
    expect(classList).toContain('btn--large');
  });

  it('should apply "is-disabled" class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const btnEl = getButton();
    expect(btnEl).toBeTruthy();
    expect(btnEl!.classList).toContain('is-disabled');
    expect(btnEl!.getAttribute('aria-disabled')).toBe('true');
  });

  it('should apply "is-loading" class when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const btnEl = getButton();
    expect(btnEl).toBeTruthy();
    expect(btnEl!.classList).toContain('is-loading');
    expect(btnEl!.getAttribute('aria-busy')).toBe('true');
  });

  it('should emit onClick when clicked and not disabled', () => {
    const spy = jest.spyOn(component.onClick, 'emit');
    fixture.detectChanges();

    getButton()?.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should NOT emit onClick when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const spy = jest.spyOn(component.onClick, 'emit');
    getButton()?.click();
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('ButtonComponent - onKeyDown()', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => jest.clearAllMocks());

  it('should trigger handleClick() on Enter if link and not disabled', () => {
    const spy = jest.spyOn(component, 'handleClick');

    fixture.componentRef.setInput('href', '/test');
    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    component.onKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).toHaveBeenCalled();
  });

  it('should trigger handleClick() on Space if link and not disabled', () => {
    const spy = jest.spyOn(component, 'handleClick');

    fixture.componentRef.setInput('href', '/test');
    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    component.onKeyDown(new KeyboardEvent('keydown', { key: ' ' }));
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT trigger handleClick() if ariaDisabled is true', () => {
    const spy = jest.spyOn(component, 'handleClick');

    fixture.componentRef.setInput('href', '/test');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.onKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should NOT trigger handleClick() if not a link', () => {
    const spy = jest.spyOn(component, 'handleClick');

    fixture.componentRef.setInput('href', undefined);
    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    component.onKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).not.toHaveBeenCalled();
  });
});
