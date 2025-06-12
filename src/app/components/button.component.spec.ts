import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
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

  it('should render as a <button> when href is not provided', () => {
    component.href = undefined;
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl).toBeTruthy();
  });

  it('should render as an <a> when href is provided', () => {
    component.href = '/some-link';
    fixture.detectChanges();

    const linkEl = fixture.debugElement.query(By.css('a'));
    expect(linkEl).toBeTruthy();
    expect(linkEl.attributes['href']).toBe('/some-link');
  });

  it('should apply the correct variant and size classes', () => {
    component.type = 'secondary';
    component.size = 'large';
    fixture.detectChanges();

    const btnEl = fixture.debugElement.query(
      By.css(component.isLink ? 'a' : 'button'),
    );
    const classList = btnEl.nativeElement.className;

    expect(classList).toContain('btn--secondary');
    expect(classList).toContain('btn--large');
  });

  it('should apply "is-disabled" class and disable button if disabled=true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const btnEl = fixture.debugElement.query(By.css('button'));
    expect(btnEl.nativeElement.disabled).not.toBeFalsy();
    expect(btnEl.nativeElement.className).toContain('is-disabled');
  });

  it('should apply "is-loading" class and aria-busy=true if loading=true', () => {
    component.loading = true;
    fixture.detectChanges();

    const btnEl = fixture.debugElement.query(By.css('button'));
    expect(btnEl.nativeElement.getAttribute('aria-busy')).toBe('true');
    expect(btnEl.nativeElement.className).toContain('is-loading');
  });

  it('should emit onClick when clicked and not disabled', () => {
    const spy = jest.spyOn(component.onClick, 'emit');
    const btnEl = fixture.debugElement.query(By.css('button'));

    btnEl.nativeElement.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should NOT emit onClick when disabled=true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const spy = jest.spyOn(component.onClick, 'emit');
    const btnEl = fixture.debugElement.query(By.css('button'));

    btnEl.nativeElement.click();
    expect(spy).not.toHaveBeenCalled();
  });
});
