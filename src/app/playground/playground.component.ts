import { Component } from '@angular/core';
import { ButtonConfig } from './button-config';
import { PlaygroundControlsComponent } from './playground-controls/playground-controls.component';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { ButtonPreviewComponent } from './button-preview/button-preview.component';

@Component({
  selector: 'app-playground',
  standalone: true,
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  imports: [
    PlaygroundControlsComponent,
    CodeSnippetComponent,
    ButtonPreviewComponent,
  ],
})
export class PlaygroundComponent {
  config: ButtonConfig = {
    type: 'primary',
    size: 'medium',
    icon: '',
    iconPosition: 'left',
    disabled: false,
    loading: false,
    href: '',
  };

  updateConfig(newConfig: ButtonConfig) {
    this.config = { ...newConfig };
  }
}
