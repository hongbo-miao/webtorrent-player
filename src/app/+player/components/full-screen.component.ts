import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-full-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img class="wtp-icon-sm" src="assets/icons/full-screen.svg" (click)="onToggleFullScreen()">
  `
})
export class FullScreenComponent {
  @Output() toggleFullScreen = new EventEmitter<void>();

  private onToggleFullScreen() {
    this.toggleFullScreen.emit();
  }
}
