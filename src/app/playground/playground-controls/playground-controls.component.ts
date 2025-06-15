import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonConfig } from '../button-config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playground-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playground-controls.component.html',
  styleUrls: ['./playground-controls.component.scss'],
})
export class PlaygroundControlsComponent {
  @Input() config!: ButtonConfig;
  @Output() configChange = new EventEmitter<ButtonConfig>();

  update<K extends keyof ButtonConfig>(key: K, value: ButtonConfig[K]) {
    this.configChange.emit({ ...this.config, [key]: value });
  }
}
