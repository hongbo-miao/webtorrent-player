import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-full-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img class="wtp-icon" src="assets/icons/full-screen.svg" (click)="onFullScreen()">
  `
})
export class FullScreenComponent {
  @Input() video: any;

  private onFullScreen() {
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.mozRequestFullScreen) {
      this.video.mozRequestFullScreen();
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    }
  }
}
