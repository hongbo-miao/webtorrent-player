import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-full-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img class="wtp-icon-sm" src="assets/icons/full-screen.svg" (click)="onEnterFullScreen()">
  `
})
export class FullScreenComponent {
  @Output() enterFullScreen = new EventEmitter<void>();

  private onEnterFullScreen() {
    this.enterFullScreen.emit();
  }
}
