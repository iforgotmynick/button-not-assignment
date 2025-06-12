import { Component } from '@angular/core';
import { ButtonComponent } from './components/button.component';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
