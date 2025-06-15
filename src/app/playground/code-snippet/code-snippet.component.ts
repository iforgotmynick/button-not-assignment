import { Component, computed, input } from '@angular/core';
import { ButtonConfig } from '../button-config';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  imports: [],
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
})
export class CodeSnippetComponent {
  readonly config = input.required<ButtonConfig>();
  readonly code = computed(() => {
    const { type, size, icon, iconPosition, disabled, loading, href } =
      this.config();

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
  });

  copy(): void {
    navigator.clipboard.writeText(this.code());
  }
}
