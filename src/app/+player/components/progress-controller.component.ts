import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-progress-controller',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .icon-wrapper {
      margin: 1rem;
    }
    
    .icon {
      vertical-align: middle;
    }
  `],
  template: `
    <a class="icon-wrapper" (click)="onBackward()">
      <img class="icon fa-lg fa-fw" src="assets/backward.svg">
    </a>
    <a class="icon-wrapper" (click)="onPlayPause()">
      <img [hidden]="!isPaused" class="icon fa-2x fa-fw" src="assets/play.svg">
      <img [hidden]="isPaused" class="icon fa-2x fa-fw" src="assets/pause.svg">
    </a>
    <a class="icon-wrapper" (click)="onForward()">
      <img class="icon fa-lg fa-fw" src="assets/forward.svg">
    </a>
  `
})
export class ProgressControllerComponent {
  @Input() isPaused: boolean;
  @Output() play = new EventEmitter<void>();
  @Output() pause = new EventEmitter<void>();
  @Output() drift = new EventEmitter<number>();

  private onPlayPause() {
    if (this.isPaused) {
      this.play.emit();
    } else {
      this.pause.emit();
    }
  }

  private onBackward() {
    this.drift.emit(-10);
  }

  private onForward() {
    this.drift.emit(10);
  }
}
