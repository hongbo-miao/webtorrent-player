import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-full-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .wrapper {
      z-index: 1;
      position: absolute;
      top: 0;
      right: 3rem;
      background-color: rgba(0, 0, 0, 0.3);
      padding: .2rem 1rem .5rem 1rem;
      margin: 0;
      border-radius: 0 0 .2rem .2rem;
    }
  `],
  template: `
    <div class="wrapper">
      <img class="wtp-icon-sm" src="assets/icons/full-screen.svg" (click)="onToggleFullScreen()">
    </div>
  `
})
export class FullScreenComponent {
  @Output() toggleFullScreen = new EventEmitter<void>();

  private onToggleFullScreen() {
    this.toggleFullScreen.emit();
  }
}
