import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaygroundComponent } from './playground.component';
import { MockComponent } from 'ng-mocks';
import { PlaygroundControlsComponent } from './playground-controls/playground-controls.component';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { ButtonPreviewComponent } from './button-preview/button-preview.component';
import { By } from '@angular/platform-browser';
import { ButtonConfig } from './button-config';

describe('PlaygroundComponent', () => {
  let fixture: ComponentFixture<PlaygroundComponent>;
  let component: PlaygroundComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlaygroundComponent,
        MockComponent(PlaygroundControlsComponent),
        MockComponent(CodeSnippetComponent),
        MockComponent(ButtonPreviewComponent),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the playground component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all subcomponents', () => {
    expect(
      fixture.debugElement.query(By.directive(PlaygroundControlsComponent)),
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.directive(CodeSnippetComponent)),
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.directive(ButtonPreviewComponent)),
    ).toBeTruthy();
  });

  it('should update config via updateConfig()', () => {
    const newConfig: ButtonConfig = {
      type: 'secondary',
      size: 'large',
      icon: 'arrow-right',
      iconPosition: 'right',
      disabled: true,
      loading: true,
      href: 'https://example.com',
    };

    component.updateConfig(newConfig);
    expect(component.config).toEqual(newConfig);
  });
});
