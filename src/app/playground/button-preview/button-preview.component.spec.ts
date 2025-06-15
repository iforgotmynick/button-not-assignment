import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonPreviewComponent } from './button-preview.component';
import { ButtonComponent } from '@ui-kit';
import { MockComponent } from 'ng-mocks';

describe('ButtonPreviewComponent', () => {
  let fixture: ComponentFixture<ButtonPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPreviewComponent, MockComponent(ButtonComponent)],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonPreviewComponent);
    fixture.componentRef.setInput('config', {
      type: 'secondary',
      size: 'large',
      icon: 'arrow-left',
      iconPosition: 'left',
      disabled: true,
      loading: false,
      href: '',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    const component = fixture.debugElement.children[0].componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render app-button with correct props', () => {
    const buttonDebug =
      fixture.debugElement.nativeElement.querySelector('app-button');
    expect(buttonDebug).toBeTruthy();

    const config = fixture.componentInstance.config();

    expect(config.type).toBe('secondary');
    expect(config.size).toBe('large');
    expect(config.icon).toBe('arrow-left');
    expect(config.iconPosition).toBe('left');
    expect(config.disabled).toBe(true);
    expect(config.loading).toBe(false);
  });
});
