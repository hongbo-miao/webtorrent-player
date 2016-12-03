import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-progress-controller',
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
    <a class="icon-wrapper"
       (click)="onBackward()">
      <img class="icon fa-lg fa-fw" src="assets/backward.svg">
    </a>
    <a class="icon-wrapper"
       (click)="onPlayPause()">
      <img *ngIf="showPlay" class="icon fa-2x fa-fw" src="assets/play.svg">
      <img *ngIf="!showPlay" class="icon fa-2x fa-fw" src="assets/pause.svg">
    </a>
    <a class="icon-wrapper"
       (click)="onForward()">
      <img class="icon fa-lg fa-fw" src="assets/forward.svg">
    </a>
  `
})
export class ProgressControllerComponent {
  @Input() video: any;
  showPlay: boolean = false;

  private onPlayPause() {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
    this.showPlay = this.video.paused;
  }

  private onBackward() {
    this.setTime(-10);
  }

  private onForward() {
    this.setTime(10);
  }

  private setTime(time: number) {
    try {
      if (time == 0) {
        this.video.currentTime = time;
      }
      else {
        this.video.currentTime += time;
      }

    } catch (err) {
      console.log('Video content might not be loaded');
    }
  }
}
