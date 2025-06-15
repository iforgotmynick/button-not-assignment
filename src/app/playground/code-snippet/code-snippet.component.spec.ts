import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeSnippetComponent } from './code-snippet.component';
import { signal } from '@angular/core';
import { ButtonConfig } from '../button-config';

describe('CodeSnippetComponent', () => {
  let component: CodeSnippetComponent;
  let fixture: ComponentFixture<CodeSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeSnippetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeSnippetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate correct code for full config', () => {
    (component as any).config = signal<ButtonConfig>({
      type: 'primary',
      size: 'medium',
      icon: 'arrow-left',
      iconPosition: 'left',
      disabled: true,
      loading: true,
      href: '',
    });

    fixture.detectChanges();

    const code = component.code();
    expect(code).toContain('<app-button');
    expect(code).toContain('variant="primary"');
    expect(code).toContain('size="medium"');
    expect(code).toContain('icon="arrow-left"');
    expect(code).toContain('iconPosition="left"');
    expect(code).toContain('[disabled]="true"');
    expect(code).toContain('[loading]="true"');
    expect(code).toContain('Playground Button');
  });

  it('should omit optional inputs when not set', () => {
    (component as any).config = signal<ButtonConfig>({
      type: 'primary',
      size: 'small',
      icon: '',
      iconPosition: undefined,
      disabled: false,
      loading: false,
      href: '',
    });

    fixture.detectChanges();

    const code = component.code();
    expect(code).toContain('variant="primary"');
    expect(code).toContain('size="small"');
    expect(code).not.toContain('icon=');
    expect(code).not.toContain('iconPosition=');
    expect(code).not.toContain('[disabled]');
    expect(code).not.toContain('[loading]');
  });

  it('should copy code to clipboard', async () => {
    const mockWrite = jest.fn();
    Object.assign(navigator, {
      clipboard: { writeText: mockWrite },
    });

    (component as any).config = signal<ButtonConfig>({
      type: 'secondary',
      size: 'large',
      icon: '',
      iconPosition: undefined,
      disabled: false,
      loading: false,
      href: '',
    });

    fixture.detectChanges();

    component.copy();

    expect(mockWrite).toHaveBeenCalledWith(component.code());
  });
});
