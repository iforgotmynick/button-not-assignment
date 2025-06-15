import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Output() readonly onClick = new EventEmitter<void>();

  readonly type = input<'primary' | 'secondary' | 'tertiary'>('primary');
  readonly size = input<'small' | 'medium' | 'large'>('medium');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly href = input<string | undefined>();
  readonly icon = input<string | undefined>();
  readonly iconPosition = input<'left' | 'right'>('left');

  readonly isLink = computed(() => !!this.href());
  readonly ariaDisabled = computed(() => this.disabled() || this.loading());
  readonly classes = computed(() => [
    'btn',
    `btn--${this.type()}`,
    `btn--${this.size()}`,
    this.disabled() ? 'is-disabled' : '',
    this.loading() && !this.isLink() ? 'is-loading' : '',
  ]);

  handleClick(): void {
    if (this.ariaDisabled()) return;
    this.onClick.emit();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.ariaDisabled()) return;

    const isEnter = event.key === 'Enter';
    const isSpace = event.key === ' ' || event.code === 'Space';

    if ((isEnter || isSpace) && this.isLink()) {
      event.preventDefault();
      this.handleClick();
    }
  }
}
