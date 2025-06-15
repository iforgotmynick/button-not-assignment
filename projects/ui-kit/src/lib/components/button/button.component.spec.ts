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

  it('should render as a <button> when href is not provided', () => {
    component.href = undefined;
    fixture.detectChanges();

    expect(getButton()).toBeTruthy();
  });

  it('should render as an <a> when href is provided', () => {
    component.href = '/some-link';
    fixture.detectChanges();

    const linkEl = getLink();
    expect(linkEl).toBeTruthy();
    expect(linkEl?.getAttribute('href')).toBe('/some-link');
  });

  it('should apply the correct variant and size classes', () => {
    component.type = 'secondary';
    component.size = 'large';
    component.ngOnChanges();
    fixture.detectChanges();

    const btnEl = getButton();

    expect(btnEl).toBeTruthy();

    const classList = btnEl!.classList;

    expect(classList).toContain('btn--secondary');
    expect(classList).toContain('btn--large');
  });

  it('should apply "is-disabled" class and disable button if disabled=true', () => {
    component.disabled = true;
    component.ngOnChanges();
    fixture.detectChanges();

    const btnEl = getButton();
    expect(btnEl).toBeTruthy();
    expect(btnEl!.disabled).not.toBeFalsy();
    expect(btnEl!.classList).toContain('is-disabled');
  });

  it('should apply "is-loading" class and aria-busy=true if loading=true', () => {
    component.loading = true;
    component.ngOnChanges();
    fixture.detectChanges();

    const btnEl = getButton();
    expect(btnEl).toBeTruthy();
    expect(btnEl!.getAttribute('aria-busy')).toBe('true');
    expect(btnEl!.classList).toContain('is-loading');
  });

  it('should emit onClick when clicked and not disabled', () => {
    const spy = jest.spyOn(component.onClick, 'emit');
    fixture.detectChanges();

    const btnEl = getButton();

    expect(btnEl).toBeTruthy();
    btnEl!.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should NOT emit onClick when disabled=true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const spy = jest.spyOn(component.onClick, 'emit');
    const btnEl = getButton();

    expect(btnEl).toBeTruthy();
    btnEl!.click();
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
    fixture.detectChanges();
  });

  afterEach(() => jest.clearAllMocks());

  it('should trigger handleClick() on Enter key if link and not disabled', () => {
    const spy = jest.spyOn(component, 'handleClick');
    component.href = '/test';
    component.disabled = false;
    component.loading = false;
    component.ngOnChanges();

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(event);

    expect(spy).toHaveBeenCalled();
  });

  it('should trigger handleClick() on Space key if link and not disabled', () => {
    const spy = jest.spyOn(component, 'handleClick');
    component.href = '/test';
    component.disabled = false;
    component.loading = false;
    component.ngOnChanges();

    const event = new KeyboardEvent('keydown', { key: ' ' });
    component.onKeyDown(event);

    expect(spy).toHaveBeenCalled();
  });

  it('should NOT trigger handleClick() if ariaDisabled is true', () => {
    const spy = jest.spyOn(component, 'handleClick');
    component.href = '/test';
    component.disabled = true;
    component.ngOnChanges();

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(event);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should NOT trigger handleClick() if not a link', () => {
    const spy = jest.spyOn(component, 'handleClick');
    component.href = undefined;
    component.disabled = false;
    component.loading = false;
    component.ngOnChanges();

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(event);

    expect(spy).not.toHaveBeenCalled();
  });
});
