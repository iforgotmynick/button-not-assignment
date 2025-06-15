import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundControlsComponent } from './playground-controls.component';

describe('PlaygroundControlsComponent', () => {
  let component: PlaygroundControlsComponent;
  let fixture: ComponentFixture<PlaygroundControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaygroundControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaygroundControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
