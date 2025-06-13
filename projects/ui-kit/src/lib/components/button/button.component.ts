import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnChanges {
  @Input() type: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() href?: string;
  @Input() iconPosition?: 'left' | 'right' = 'left';

  @Output() readonly onClick = new EventEmitter<void>();

  private _classes: string[] = [];

  get isLink(): boolean {
    return !!this.href;
  }

  get ariaDisabled(): boolean {
    return this.disabled || this.loading;
  }

  get classes(): string[] {
    return this._classes;
  }

  ngOnChanges(): void {
    this._classes = [
      'btn',
      `btn--${this.type}`,
      `btn--${this.size}`,
      this.disabled ? 'is-disabled' : '',
      this.loading ? 'is-loading' : '',
    ];
  }

  handleClick(): void {
    if (this.ariaDisabled) {
      return;
    }
    this.onClick.emit();
  }
}
