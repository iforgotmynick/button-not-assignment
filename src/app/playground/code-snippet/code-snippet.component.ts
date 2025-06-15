import { Component, Input } from '@angular/core';
import { ButtonConfig } from '../button-config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
})
export class CodeSnippetComponent {
  @Input() config!: ButtonConfig;

  get code(): string {
    const { type, size, icon, iconPosition, disabled, loading, href } =
      this.config;

    const lines = [
      `<app-button`,
      `  variant="${type}"`,
      `  size="${size}"`,
      href ? `  href="${href}"` : null,
      icon ? `  icon="${icon}"` : null,
      iconPosition ? `  iconPosition="${iconPosition}"` : null,
      disabled ? `  [disabled]="true"` : null,
      loading && !href ? `  [loading]="true"` : null,
      `>`,
      `  Playground Button`,
      `</app-button>`,
    ];

    return lines.filter(Boolean).join('\n');
  }

  copy(): void {
    navigator.clipboard.writeText(this.code);
  }
}
