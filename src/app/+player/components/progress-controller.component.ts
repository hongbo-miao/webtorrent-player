import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-progress-controller',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .icon-wrapper {
      margin: 1rem;
    }
  `],
  template: `
    <a class="icon-wrapper" (click)="onBackward()">
      <img class="wtp-icon" src="assets/icons/backward.svg">
    </a>
    <a class="icon-wrapper" (click)="onTogglePause()">
      <img [hidden]="!isPaused" class="wtp-icon-lg" src="assets/icons/play.svg">
      <img [hidden]="isPaused" class="wtp-icon-lg" src="assets/icons/pause.svg">
    </a>
    <a class="icon-wrapper" (click)="onForward()">
      <img class="wtp-icon" src="assets/icons/forward.svg">
    </a>
  `
})
export class ProgressControllerComponent {
  @Input() isPaused: boolean;
  @Output() togglePause = new EventEmitter<boolean>();
  @Output() drift = new EventEmitter<number>();

  private onTogglePause() {
    this.togglePause.emit(!this.isPaused);
  }

  private onBackward() {
    this.drift.emit(-10);
  }

  private onForward() {
    this.drift.emit(10);
  }
}
