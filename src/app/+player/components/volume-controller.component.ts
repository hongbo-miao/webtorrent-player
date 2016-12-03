import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-volume-controller',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .range {
      width: 100%;
    }
  `],
  template: `
    <input type="range" min="0" max="100" value="100" class="range" #range (change)="onChangeVolume(range.value)" />
  `
})
export class VolumeControllerComponent {
  @Input() video: any;

  private onChangeVolume(volume: number) {
    this.video.volume = volume / 100;
  }
}
