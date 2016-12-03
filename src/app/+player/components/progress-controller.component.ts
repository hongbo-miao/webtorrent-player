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
    
    .play-pause {
      font-size: 1.8rem;
    }
  `],
  template: `
    <a class="icon-wrapper"
       (click)="onBackward()">
      <!--<i class="fa fa-backward fa-lg fa-fw" aria-hidden="true"></i>-->
      <img class="icon fa-lg fa-fw" src="assets/backward.svg">
    </a>
    <a class="icon-wrapper"
       (click)="onPlayPause()">
      <!--<i class="fa fa-lg fa-fw" [ngClass]="showPlay ? 'fa-play' : 'fa-pause'" aria-hidden="true"></i>-->
      <img *ngIf="showPlay" class="icon fa-2x fa-fw" src="assets/play.svg">
      <img *ngIf="!showPlay" class="icon fa-2x fa-fw" src="assets/pause.svg">
    </a>
    <a class="icon-wrapper"
       (click)="onForward()">
      <!--<i class="fa fa-forward fa-lg fa-fw" aria-hidden="true"></i>-->
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
