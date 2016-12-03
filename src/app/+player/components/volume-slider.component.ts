import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-volume-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input type="range" min="0" max="100" value="100" #range (change)="onChangeVolume(range.value)" />
  `
})
export class VolumeSliderComponent {
  @Input() video: any;

  private onChangeVolume(volume: number) {
    this.video.volume = volume / 100;
  }
}
