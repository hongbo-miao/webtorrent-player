import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-volume-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <wtp-slider [min]="0" [max]="100" [val]="100" (changeVal)="onChangeVal($event)"></wtp-slider>
  `
})
export class VolumeSliderComponent {
  @Input() video: any;

  private onChangeVal(volume: number) {
    this.video.volume = volume / 100;
  }
}
