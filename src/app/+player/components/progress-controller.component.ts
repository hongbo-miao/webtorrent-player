import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-progress-controller',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .range {
      width: 100%;
    }
  `],
  template: `
    <input type="range" min="0" max="100" value="0" class="range" #range (change)="onChangeProgress(range.value)" />
  `
})
export class ProgressControllerComponent {
  @Input() video: any;

  private onChangeProgress(progress: number) {
    this.video.currentTime = progress / 100 * this.video.duration;
  }
}
