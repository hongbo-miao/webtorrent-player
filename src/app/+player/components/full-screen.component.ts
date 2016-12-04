import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-full-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img class="icon fa-fw" src="assets/full-screen.svg" (click)="onFullScreen()">
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
