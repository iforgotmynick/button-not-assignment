import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaygroundControlsComponent } from './playground-controls.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ButtonConfig } from '../button-config';

describe('PlaygroundControlsComponent', () => {
  let component: PlaygroundControlsComponent;
  let fixture: ComponentFixture<PlaygroundControlsComponent>;

  const configValue: ButtonConfig = {
    type: 'primary',
    size: 'medium',
    icon: '',
    iconPosition: 'left',
    href: '',
    disabled: false,
    loading: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaygroundControlsComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaygroundControlsComponent);
    component = fixture.componentInstance;

    jest.spyOn(component, 'config').mockImplementation(() => configValue);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit configChange when type is changed', () => {
    const emitSpy = jest.spyOn(component.configChange, 'emit');

    const select: HTMLSelectElement = fixture.debugElement.queryAll(
      By.css('select'),
    )[0].nativeElement;

    select.value = 'secondary';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'secondary' }),
    );
  });

  it('should update href input and hide loading checkbox', () => {
    const emitSpy = jest.spyOn(component.configChange, 'emit');

    const input: HTMLInputElement = fixture.debugElement.query(
      By.css('input[type="text"]'),
    ).nativeElement;
    input.value = 'https://test.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({ href: 'https://test.com' }),
    );

    jest.spyOn(component, 'config').mockImplementation(() => ({
      ...configValue,
      href: 'https://test.com',
    }));
    fixture.detectChanges();

    const loadingLabel = fixture.debugElement
      .queryAll(By.css('label'))
      .find((el) => el.nativeElement.textContent.includes('Loading'));

    expect(loadingLabel).toBeUndefined();
  });

  it('should toggle disabled checkbox', () => {
    const emitSpy = jest.spyOn(component.configChange, 'emit');

    const checkbox: HTMLInputElement = fixture.debugElement.query(
      By.css('input[type="checkbox"]'),
    ).nativeElement;
    checkbox.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({ disabled: true }),
    );
  });

  it('should toggle loading checkbox if href is not set', () => {
    jest.spyOn(component, 'config').mockImplementation(() => ({
      ...configValue,
      href: '',
    }));
    fixture.detectChanges();

    const checkboxes = fixture.debugElement.queryAll(
      By.css('input[type="checkbox"]'),
    );
    expect(checkboxes.length).toBe(2); // disabled + loading
  });
});
