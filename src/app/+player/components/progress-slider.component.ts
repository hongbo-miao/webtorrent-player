import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'my-progress-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input type="range" min="0" max="100" value="0" #range (change)="onChangeProgress(range.value)" />
  `
})
export class ProgressSliderComponent implements OnInit {
  @Input() video: any;

  ngOnInit() {

  }

  private onChangeProgress(progress: number) {
    this.video.currentTime = progress / 100 * this.video.duration;
  }
}
