import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-volume-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <my-slider [min]="0" [max]="100" [val]="100" (changeVal)="onChangeVal($event)"></my-slider>
  `
})
export class VolumeSliderComponent {
  @Input() video: any;

  private onChangeVal(volume: number) {
    this.video.volume = volume / 100;
  }
}
